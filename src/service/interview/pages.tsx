import { useEffect, useRef } from "react";
import { Button } from "../../design";
import useQuestion from "./hooks/useQuestion";
import useVideoInterview from "./hooks/useVideoInterview";

export default function InterviewPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { initialVideoStream, videoStream, recodingVideo, recording, stopRecording } = useVideoInterview();
  const { positionQuestion } = useQuestion();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = function (e) {
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
      <video ref={videoRef} controls muted></video>
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
            <Button size="default" color="primary" style={{ marginLeft: "8px" }}>
              문제 뽑기
            </Button>
          </>
        )}
      </section>
    </div>
  );
}
