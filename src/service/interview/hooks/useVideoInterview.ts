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
    rec.start(1000);
  }, [videoStream]);

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
  };
}
