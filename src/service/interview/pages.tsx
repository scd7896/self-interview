import { css } from "@emotion/react";
import { useCallback, useEffect, useRef } from "react";
import { Button } from "../../design";
import colors from "../../design/color";
import useQuestion from "./hooks/useQuestion";
import useVideoInterview from "./hooks/useVideoInterview";

export default function InterviewPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { initialVideoStream, videoStream, recodingVideo, recording, stopRecording, stopVideoStream } =
    useVideoInterview();
  const { randomPickQuestion, setQuestionIndex, questionIndex, selectedQuestion, resetQuestion } = useQuestion();

  const onNextButtonClick = useCallback(() => {
    setQuestionIndex((prev) => (prev === undefined ? 0 : prev + 1));
  }, [setQuestionIndex]);

  const onStopButtonClick = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();

      videoRef.current.src = "";
    }

    stopVideoStream();
    resetQuestion();
  }, [stopVideoStream, resetQuestion]);

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
      <section css={videoWrapper}>
        {selectedQuestion && questionIndex !== undefined && (
          <div css={questionWrapper}>{selectedQuestion[questionIndex]}</div>
        )}
        <video ref={videoRef} muted></video>
      </section>
      <nav css={navWrapper}>
        {!videoStream && (
          <Button size="default" color="primary" onClick={initialVideoStream} disabled={videoStream !== undefined}>
            화면 ON
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
    </div>
  );
}

const videoWrapper = css`
  text-align: center;
  position: relative;
  background-color: ${colors.netural[200]};
`;

const questionWrapper = css`
  width: 100%;
  padding: 24px;
  position: absolute;
  left: 0;
  top: 0;
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
