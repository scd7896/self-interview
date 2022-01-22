import { useCallback, useState } from "react";

export default function useVideoInterview() {
  const [videoStream, setVideoStream] = useState<MediaStream>();
  const [recording, setRecording] = useState<any>();
  const [recordStartTime, setRecordStartTime] = useState<Date>();

  const initialVideoStream = useCallback(
    async (mediaTrackConstraints?: MediaTrackConstraints) => {
      if (videoStream) return;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: mediaTrackConstraints });
      setVideoStream(stream);
    },
    [videoStream],
  );

  const recodingVideo = useCallback(async () => {
    if (!videoStream) return;
    const handles = await (window as any).showSaveFilePicker({
      types: [
        {
          description: "Text file",
          accept: { "video/webm": [".webm"] },
        },
      ],
    });
    const createWritable = await handles.createWritable();
    const rec = new (window as any).MediaRecorder(videoStream, {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
      mimeType: "video/webm;codecs=vp9",
    });
    setRecording(rec);
    setRecordStartTime(new Date());
    rec.ondataavailable = (e: any) => {
      createWritable.write(e.data);
    };
    rec.onstop = () => {
      createWritable.close();
      setRecording(undefined);
    };
    rec.start(10);
  }, [videoStream]);

  const getTimeElapsed = useCallback(() => {
    if (!recordStartTime) return null;
    const nowDate = new Date();
    let diffMSec = nowDate.getTime() - recordStartTime.getTime();
    const hour = 1000 * 60 * 60;
    const elapsedHour = Math.floor(diffMSec / hour);
    diffMSec %= hour;

    const minutes = 1000 * 60;
    const elapsedMinutes = Math.floor(diffMSec / minutes);
    diffMSec %= minutes;

    const seconds = 1000;
    const elapsedSeconds = Math.floor(diffMSec / seconds);
    diffMSec %= seconds;

    return [elapsedHour, elapsedMinutes, elapsedSeconds, diffMSec].join(":");
  }, [recordStartTime]);

  const stopRecording = useCallback(() => {
    if (recording) recording.stop();
  }, [recording]);

  const stopVideoStream = useCallback(() => {
    if (recording) recording.stop();
    if (videoStream) {
      const tracks = videoStream.getTracks();
      tracks.map((track) => track.stop());
    }
    setVideoStream(undefined);
    setRecording(undefined);
    setRecordStartTime(undefined);
  }, [videoStream, recording]);

  return {
    videoStream,
    initialVideoStream,
    recodingVideo,
    recording,
    stopRecording,
    recordStartTime,
    stopVideoStream,
    getTimeElapsed,
  };
}
