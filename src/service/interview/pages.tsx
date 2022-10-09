import { css } from "@emotion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../../design";
import colors from "../../design/color";
import Modal from "../../design/modal/Modal";
import { Link, useHistory } from "../../ioc/history";
import { positionValue } from "../../util/constant";
import SelfInputForm from "./components/SelfInputForm";
import useQuestion from "./hooks/useQuestion";
import useVideoInterview from "./hooks/useVideoInterview";

import VTT from "./model/VTT";

export default function InterviewPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const VTTInstance = useMemo(() => new VTT(), []);
  const { getParam } = useHistory();
  const position = getParam("position");
  const [modalVisible, setModalVisible] = useState(position === positionValue.SELF_INTERVIEW);

  const { initialVideoStream, videoStream, recording, stopVideoStream, getTimeElapsed } = useVideoInterview();

  const {
    randomPickQuestion,
    setQuestionIndex,
    questionIndex,
    selectedQuestion,
    resetQuestion,
    questionDownload,
    setSelectedQuestion,
  } = useQuestion();

  const onNextButtonClick = useCallback(() => {
    const diffString = getTimeElapsed();

    if (diffString === null || selectedQuestion === undefined) return setQuestionIndex(0);

    if (questionIndex === undefined) {
      VTTInstance.startCheckTimerContentTmpSave(diffString, selectedQuestion[0]);
    } else {
      VTTInstance.finishCheckTimer(diffString);
      if (questionIndex + 1 < selectedQuestion.length) {
        VTTInstance.startCheckTimerContentTmpSave(diffString, selectedQuestion[questionIndex + 1]);
      }
    }

    setQuestionIndex((prev) => {
      if (prev === undefined) return 0;

      return prev + 1;
    });
  }, [setQuestionIndex, getTimeElapsed, selectedQuestion, VTTInstance, questionIndex]);

  const onStopButtonClick = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();

      videoRef.current.src = "";
    }
    resetQuestion();
    stopVideoStream();
    const filename = window.prompt("질문의 내용을 다운로드 받으시겠습니까?");
    if (filename) VTTInstance.download(filename);
  }, [resetQuestion, VTTInstance, stopVideoStream]);

  const videoOnairClickListener = useCallback(async () => {
    if (videoRef.current) {
      const width = videoRef.current.clientWidth;
      const height = videoRef.current.clientHeight;

      await initialVideoStream({ width, height });
    }
  }, [initialVideoStream]);

  const questionPickAndRecordingStart = useCallback(() => {
    randomPickQuestion();
  }, [randomPickQuestion]);

  const isInterviewEnd = useMemo(() => {
    return selectedQuestion && questionIndex === selectedQuestion.length;
  }, [selectedQuestion, questionIndex]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = function () {
        if (videoRef.current) videoRef.current.play();
      };
    }
  }, []);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  const selfInterviewInputSubmitListener = useCallback(
    (questions: string[]) => {
      console.log(questions);
      setSelectedQuestion(questions);
      setModalVisible(false);
    },
    [setSelectedQuestion],
  );

  return (
    <div css={wrapper}>
      <Modal visible={modalVisible}>
        <SelfInputForm onSubmit={({ questions }) => selfInterviewInputSubmitListener(questions || [])} />
      </Modal>
      <section css={headerWrapper}>
        <Link to="/review">녹화영상 리뷰하러가기</Link>
        <Button size="default" color="primary" onClick={questionDownload}>
          질문 내용 다운로드
        </Button>
      </section>
      <section css={videoWrapper} ref={videoWrapperRef}>
        {selectedQuestion && questionIndex !== undefined && (
          <div css={questionWrapper}>{selectedQuestion[questionIndex]}</div>
        )}
        <video css={outputVideo} ref={videoRef} muted></video>
        {recording && <div css={recordingMark}> </div>}
      </section>
      <nav css={navWrapper}>
        {!videoStream && (
          <Button size="default" color="primary" onClick={videoOnairClickListener} disabled={videoStream !== undefined}>
            녹화 시작
          </Button>
        )}
        {videoStream && (
          <>
            <div>
              {!selectedQuestion && (
                <Button size="default" color="primary" css={marginLeft} onClick={questionPickAndRecordingStart}>
                  문제 뽑기
                </Button>
              )}
              {selectedQuestion && questionIndex !== selectedQuestion.length && (
                <Button css={marginLeft} size="default" color="primary" onClick={onNextButtonClick}>
                  {questionIndex === undefined ? "SelfInterview 시작" : "다음"}
                </Button>
              )}
              {isInterviewEnd && (
                <Button size="default" color="primary" onClick={onStopButtonClick}>
                  녹화 종료 및 질문 다운로드
                </Button>
              )}
            </div>
            <Button size="default" color="danger" onClick={onStopButtonClick}>
              중지
            </Button>
          </>
        )}
      </nav>
    </div>
  );
}

const videoWrapper = css`
  width: 100%;
  height: 0;
  padding-bottom: 50%;
  text-align: center;
  position: relative;
  background-color: ${colors.netural[200]};
`;

const questionWrapper = css`
  width: 100%;
  padding: 24px 0px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  color: ${colors.netural[100]};
`;

const wrapper = css`
  padding-bottom: 24px;
`;

const navWrapper = css`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

const marginLeft = css`
  margin-left: 8px;
`;

const outputVideo = css`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform: scaleX(-1);
`;

const recordingMark = css`
  width: 24px;
  height: 24px;
  background: ${colors.danger[700]};
  position: absolute;
  bottom: 24px;
  right: 24px;
  border-radius: 100%;
`;

const headerWrapper = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;
