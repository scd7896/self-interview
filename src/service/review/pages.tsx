import { Upload } from "../../design";
import { onSubmit } from "web-form-helper";
import useReview from "./hooks/useReview";
import ReviewPlayer from "./components/ReviewPlayer";
import { Button } from "../../design";
import { useCallback } from "react";
import { css } from "@emotion/react";

export default function ReviewPage() {
  const { setVttAndVideo, videoUrl, vttFileUrl } = useReview();

  const uploadSubmitListener = useCallback(
    ({ vtt, vtt_url, video, video_url }: any) => {
      setVttAndVideo({
        video,
        videoUrl: video_url,
        vtt,
        vttUrl: vtt_url,
      });
    },
    [setVttAndVideo],
  );

  const validate = useCallback(({ video }: any) => {
    if (!video)
      return {
        name: "video",
        message: "video를 반드시 입력해주세요",
      };
    return undefined;
  }, []);

  return (
    <div>
      {!videoUrl && (
        <form
          onSubmit={onSubmit(uploadSubmitListener, {
            validate,
          })}
        >
          <section>
            <h2>webm 파일을 업로드해주세요</h2>
            <Upload name="video" accept=".webm" />
          </section>
          <section>
            <h2>vtt 파일을 업로드해주세요</h2>
            <Upload name="vtt" accept=".vtt" />
          </section>
          <Button css={buttonStyle} type="submit" color="primary" size="large">
            입력완료
          </Button>
        </form>
      )}
      <section css={playerWrapper}>{videoUrl && <ReviewPlayer videoUrl={videoUrl} vttUrl={vttFileUrl} />}</section>
    </div>
  );
}

const buttonStyle = css`
  margin-top: 16px;
`;

const playerWrapper = css`
  width: 100%;
`;
