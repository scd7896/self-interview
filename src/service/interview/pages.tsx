import { css } from "@emotion/react";
import { useCallback, useEffect, useRef } from "react";
import { Button } from "../../design";
import colors from "../../design/color";
import useQuestion from "./hooks/useQuestion";
import useSpeechRecognition from "./hooks/useSpeechRecognition";
import useVideoInterview from "./hooks/useVideoInterview";
import useVtt from "./hooks/useVtt";

export default function InterviewPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  const { initialVideoStream, videoStream, recodingVideo, recording, stopRecording, stopVideoStream, getTimeElapsed } =
    useVideoInterview();
  const { randomPickQuestion, setQuestionIndex, questionIndex, selectedQuestion, resetQuestion } = useQuestion();

  const { startWriteContent, finishWriteContent, download } = useVtt();
  const { startSpeech, endSpeech } = useSpeechRecognition();

  const onNextButtonClick = useCallback(() => {
    setQuestionIndex((prev) => {
      const diffString = getTimeElapsed();
      if (prev === undefined) {
        if (diffString && selectedQuestion) startWriteContent(diffString, selectedQuestion[0]);
        return 0;
      }

      if (diffString && selectedQuestion) {
        finishWriteContent(diffString);
        startWriteContent(diffString, selectedQuestion[prev + 1]);
      }

      return prev + 1;
    });
  }, [setQuestionIndex, getTimeElapsed, selectedQuestion, finishWriteContent, startWriteContent]);

  const onStopButtonClick = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();

      videoRef.current.src = "";
    }

    stopVideoStream();
    resetQuestion();
    download();
  }, [stopVideoStream, resetQuestion, download]);

  const videoOnairClickListener = useCallback(() => {
    if (videoRef.current) {
      const width = videoRef.current.clientWidth;
      const height = videoRef.current.clientHeight;

      initialVideoStream({ width, height });
    }
  }, [initialVideoStream]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = function () {
        videoRef.current?.play();
      };
    }
  }, []);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  return (
    <div css={wrapper}>
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
            시작하기
          </Button>
        )}
        {videoStream && (
          <>
            <div>
              <Button size="default" color="danger" onClick={onStopButtonClick}>
                중지
              </Button>
              {!selectedQuestion && (
                <Button size="default" color="primary" css={marginLeft} onClick={randomPickQuestion}>
                  문제 뽑기
                </Button>
              )}
              {selectedQuestion && (
                <Button
                  css={marginLeft}
                  size="default"
                  color="primary"
                  disabled={questionIndex === selectedQuestion?.length}
                  onClick={onNextButtonClick}
                >
                  {questionIndex === undefined ? "시작하기" : "다음"}
                </Button>
              )}
            </div>
            <Button css={marginLeft} size="default" color="primary" onClick={recording ? stopRecording : recodingVideo}>
              {recording ? "녹화 종료" : "녹화 시작"}
            </Button>
          </>
        )}
      </nav>
      <Button size="default" color="primary" onClick={startSpeech}>
        test스피치
      </Button>
      <Button size="default" color="primary" onClick={endSpeech}>
        endSpeech
      </Button>
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
  width: 48px;
  height: 48px;
  background: ${colors.danger[700]};
  position: absolute;
  bottom: 24px;
  right: 24px;
  border-radius: 100%;
`;
