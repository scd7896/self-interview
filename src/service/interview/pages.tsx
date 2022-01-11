import { css } from "@emotion/react";
import { useCallback, useEffect, useRef } from "react";
import { Button } from "../../design";
import colors from "../../design/color";
import useQuestion from "./hooks/useQuestion";
import useVideoInterview from "./hooks/useVideoInterview";

export default function InterviewPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { initialVideoStream, videoStream, recodingVideo, recording, stopRecording } = useVideoInterview();
  const { positionQuestion, randomPickQuestion, setQuestionIndex, questionIndex, selectedQuestion } = useQuestion();

  const onNextButtonClick = useCallback(() => {
    setQuestionIndex((prev) => (prev === undefined ? 0 : prev + 1));
  }, [setQuestionIndex]);

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
    <div>
      <section css={videoWrapper}>
        {selectedQuestion && questionIndex !== undefined && (
          <div css={questionWrapper}>{selectedQuestion[questionIndex]}</div>
        )}
        <video ref={videoRef} muted></video>
      </section>
      <section>
        {!videoStream && (
          <Button size="default" color="primary" onClick={initialVideoStream} disabled={videoStream !== undefined}>
            화면 ON
          </Button>
        )}
        {videoStream && (
          <>
            <Button size="default" color="primary" onClick={recording ? stopRecording : recodingVideo}>
              {recording ? "녹화 종료" : "녹화 시작"}
            </Button>
            <Button size="default" color="primary" style={{ marginLeft: "8px" }} onClick={randomPickQuestion}>
              문제 뽑기
            </Button>
          </>
        )}
        {positionQuestion && (
          <Button
            size="default"
            color="primary"
            disabled={questionIndex === selectedQuestion?.length}
            onClick={onNextButtonClick}
          >
            {questionIndex === undefined ? "시작하기" : "다음"}
          </Button>
        )}
      </section>
    </div>
  );
}

const videoWrapper = css`
  position: relative;
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
