import { css } from "@emotion/react";
import { useRef } from "react";

interface IProp {
  videoUrl: string;
  vttUrl?: string;
}

export default function ReviewPlayer({ videoUrl, vttUrl }: IProp) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <section css={wrapper}>
      <video
        ref={ref}
        css={videoStyle}
        src={videoUrl}
        controls
        onLoadedMetadata={(e) => {
          if (e.currentTarget.duration === Infinity) {
            e.currentTarget.currentTime = 1e101;

            e.currentTarget.ontimeupdate = function () {
              this.ontimeupdate = () => {
                return;
              };
              if (ref.current) ref.current.currentTime = 0;
            };
          }
        }}
      >
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
