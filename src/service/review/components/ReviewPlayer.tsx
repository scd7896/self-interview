import { css } from "@emotion/react";

interface IProp {
  videoUrl: string;
  vttUrl?: string;
}

export default function ReviewPlayer({ videoUrl, vttUrl }: IProp) {
  return (
    <video css={videoStyle} src={videoUrl} controls>
      {vttUrl && <track default kind="captions" srcLang="ko" src={vttUrl}></track>}
    </video>
  );
}

const videoStyle = css`
  width: 100%;
  height: auto;
`;
