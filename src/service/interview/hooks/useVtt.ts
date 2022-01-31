import { useCallback, useRef } from "react";

export default function useVtt() {
  const contentRef = useRef<string>("WEBVTT\n\n");
  const tmpRef = useRef<string>();

  const resetFile = useCallback(() => {
    contentRef.current = "WEBVTT\n\n";
    tmpRef.current = undefined;
  }, []);

  const startWriteContent = useCallback((startTime: string, content: string) => {
    contentRef.current += `${startTime} --> `;
    tmpRef.current = content;
  }, []);

  const finishWriteContent = useCallback((endTime: string) => {
    if (tmpRef.current === undefined) return;
    contentRef.current += `${endTime}\n ${tmpRef.current}\n\n`;
    tmpRef.current = "";
    console.log(contentRef.current);
  }, []);

  const download = useCallback(
    (filename: string) => {
      const file = new File([contentRef.current], `${filename}.vtt`, { type: "octet/stream" });
      const url = URL.createObjectURL(file);

      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.click();
      document.body.removeChild(a);
      a.remove();
      a.download = `${filename}.vtt`;
      URL.revokeObjectURL(url);
      resetFile();
    },
    [resetFile],
  );

  return { resetFile, startWriteContent, finishWriteContent, download };
}
