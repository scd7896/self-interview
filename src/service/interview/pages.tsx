import { useEffect, useRef } from "react";
import { Button } from "../../design";
import useVideoInterview from "./hooks/useVideoInterview";

export default function InterviewPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { initialVideoStream, videoStream, recodingVideo, recording, stopRecording } = useVideoInterview();

  useEffect(() => {
    initialVideoStream();
  }, [initialVideoStream]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = function (e) {
        videoRef.current?.play();
      };
    }
  }, []);

  useEffect(() => {
    if (videoRef.current && videoStream) {
      console.log(videoStream);
      videoRef.current.srcObject = videoStream;
    }
  }, [videoStream]);

  return (
    <div>
      <video ref={videoRef} controls muted></video>
      <section>
        <Button size="default" color="primary" onClick={recording ? stopRecording : recodingVideo}>
          {recording ? "녹화 종료" : "녹화"}
        </Button>
      </section>
    </div>
  );
}
