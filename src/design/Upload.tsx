import { css } from "@emotion/react";
import { useCallback, useRef, useState } from "react";
import Button from "./Button";
import { onSubmit } from "web-form-helper";

interface IFileDescription {
  url: string;
  name: string;
}

export default function Upload() {
  const uploadWrapperRef = useRef<HTMLDivElement>(null);
  const [fileDescriptions, setFileDescriptions] = useState<IFileDescription[]>([]);
  const fileUploadEventListener = useCallback((e) => {
    e.preventDefault();
    const input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";
    input.name = "file";
    input.addEventListener("change", (e: any) => {
      if (e.target.files?.length) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setFileDescriptions((prev) => [
          ...prev,
          {
            url,
            name: file.name,
          },
        ]);
        uploadWrapperRef.current?.appendChild(input);
      } else {
        input.remove();
      }
    });
    input.click();
  }, []);

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
