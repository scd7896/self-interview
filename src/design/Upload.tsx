import { css } from "@emotion/react";
import { useCallback, useRef, useState } from "react";
import Button from "./Button";

interface IFileDescription {
  url: string;
  fileName: string;
}

interface IProp extends React.InputHTMLAttributes<any> {
  multiple?: boolean;
}

export default function Upload({ multiple, name, accept }: IProp) {
  const uploadWrapperRef = useRef<HTMLDivElement>(null);
  const [fileDescriptions, setFileDescriptions] = useState<IFileDescription[]>([]);
  const [fileDescription, setFileDescription] = useState<IFileDescription>();
  const fileUploadEventListener = useCallback(
    (e) => {
      e.preventDefault();
      const input = document.createElement("input");
      input.type = "file";
      input.style.display = "none";
      input.name = name || "file";
      if (accept) input.accept = accept;
      input.addEventListener("change", (e: any) => {
        if (e.target.files?.length) {
          const file = e.target.files[0];
          const url = URL.createObjectURL(file);
          if (multiple) {
            setFileDescriptions((prev) => [
              ...prev,
              {
                url,
                fileName: file.name,
              },
            ]);
            uploadWrapperRef.current?.appendChild(input);
          } else {
            const prevInput = uploadWrapperRef.current?.querySelector("input");
            prevInput && uploadWrapperRef.current?.removeChild(prevInput);
            uploadWrapperRef.current?.appendChild(input);

            setFileDescription((prev) => {
              prev?.url && URL.revokeObjectURL(prev.url);
              return {
                url,
                fileName: file.name,
              };
            });
          }
        } else {
          input.remove();
        }
      });
      input.click();
    },
    [multiple, accept, name],
  );

  return (
    <div ref={uploadWrapperRef}>
      <Button css={uploadButton} color="default" size="default" onClick={fileUploadEventListener}>
        fileUpload
      </Button>
      <section>
        {fileDescriptions?.map(({ url, fileName }) => (
          <>
            <a rel="noreferrer" key={url} href={url} css={anchor} target="_blank">
              {fileName}
            </a>
            <input type="hidden" name={`${name || "file"}_url`} value={url} />
          </>
        ))}
        {fileDescription && (
          <>
            <a rel="noreferrer" href={fileDescription.url} css={anchor} target="_blank">
              {fileDescription.fileName}
            </a>
            <input type="hidden" name={`${name || "file"}_url`} value={fileDescription.url} />
          </>
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
