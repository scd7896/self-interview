import { css } from "@emotion/react";

interface IProp {
  videoUrl: string;
  vttUrl?: string;
}

export default function ReviewPlayer({ videoUrl, vttUrl }: IProp) {
  return (
    <section css={wrapper}>
      <video css={videoStyle} src={videoUrl} controls>
        {vttUrl && <track default kind="captions" srcLang="ko" src={vttUrl}></track>}
      </video>
    </section>
  );
}

const videoStyle = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const wrapper = css`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 90%;
`;
