import { useCallback, useState } from "react";

interface ISetVttAndVideo {
  video?: File;
  videoUrl?: string;
  vtt?: File;
  vttUrl?: string;
}

export default function useReview() {
  const [videoFile, setVideoFile] = useState<File>();
  const [videoUrl, setVideoUrl] = useState<string>();

  const [vttFile, setVttFile] = useState<File>();
  const [vttFileUrl, setVttFileUrl] = useState<string>();

  const setVttAndVideo = useCallback(({ video, videoUrl, vtt, vttUrl }: ISetVttAndVideo) => {
    setVideoFile(video);
    setVideoUrl(videoUrl);
    setVttFile(vtt);
    setVttFileUrl(vttUrl);
  }, []);

  return {
    setVttAndVideo,
    videoFile,
    videoUrl,
    vttFile,
    vttFileUrl,
  };
}
