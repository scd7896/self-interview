import { useCallback, useState } from "react";

export default function useVideoInterview() {
	const [videoStream, setVideoStream] = useState<MediaStream>();
	const [recording, setRecording] = useState<any>();

	const initialVideoStream = useCallback(async () => {
		if (videoStream) return;
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: { width: 640, height: 480 } });
		setVideoStream(stream);
	}, [videoStream]);

	const recodingVideo = useCallback(async () => {
		if (!videoStream) return;
		const handles = await (window as any).showSaveFilePicker();
		const createWritable = await handles.createWritable();
		const rec = new (window as any).MediaRecorder(videoStream, {
			audioBitsPerSecond : 128000,
      videoBitsPerSecond : 2500000,
			mimeType : 'video/webm;codecs=vp9'
		});
		setRecording(rec);
		rec.ondataavailable = (e: any) => { 
			console.log(e.data)
      // e.data.type = 'video/webm;codecs=vp9'
      createWritable.write(e.data)
    };
		rec.onstop = () => {
      createWritable.close()
      setRecording(undefined);
    }
		rec.start(1000);
	}, [videoStream])

	async function stopRecording() {
		if (recording) recording.stop();
	}

	return {
		videoStream,
		initialVideoStream,
		recodingVideo,
		recording,
		stopRecording
	};
}