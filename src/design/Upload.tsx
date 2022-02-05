import { css } from "@emotion/react";
import { useCallback, useRef, useState } from "react";
import Button from "./Button";
import { onSubmit } from "web-form-helper";

interface IFileDescription {
  url: string;
  name: string;
}

interface IProp {
  multiple?: boolean;
}

export default function Upload({ multiple }: IProp) {
  const uploadWrapperRef = useRef<HTMLDivElement>(null);
  const [fileDescriptions, setFileDescriptions] = useState<IFileDescription[]>([]);
  const [fileDescription, setFileDescription] = useState<IFileDescription>();
  const fileUploadEventListener = useCallback(
    (e) => {
      e.preventDefault();
      const input = document.createElement("input");
      input.type = "file";
      input.style.display = "none";
      input.name = "file";
      input.addEventListener("change", (e: any) => {
        if (e.target.files?.length) {
          const file = e.target.files[0];
          const url = URL.createObjectURL(file);
          if (multiple) {
            setFileDescriptions((prev) => [
              ...prev,
              {
                url,
                name: file.name,
              },
            ]);
            uploadWrapperRef.current?.appendChild(input);
          } else {
            const prevInput = uploadWrapperRef.current?.querySelector("input");
            prevInput && uploadWrapperRef.current?.removeChild(prevInput);
            uploadWrapperRef.current?.appendChild(input);
            setFileDescription({
              url,
              name: file.name,
            });
          }
        } else {
          input.remove();
        }
      });
      input.click();
    },
    [multiple],
  );

  return (
    <div ref={uploadWrapperRef}>
      <Button css={uploadButton} color="default" size="default" onClick={fileUploadEventListener}>
        fileUpload
      </Button>
      <section>
        {fileDescriptions?.map(({ url, name }) => (
          <a rel="noreferrer" key={url} href={url} css={anchor} target="_blank">
            {name}
          </a>
        ))}
        {fileDescription && (
          <a rel="noreferrer" href={fileDescription.url} css={anchor} target="_blank">
            {fileDescription.name}
          </a>
        )}
      </section>
    </div>
  );
}

const anchor = css`
  display: block;
  text-decoration: none;
  & + & {
    margin-top: 8px;
  }
`;

const uploadButton = css`
  cursor: pointer;
`;
