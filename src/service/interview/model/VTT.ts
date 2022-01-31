class VTT {
  fileContents: string;
  contentText?: string;

  constructor() {
    this.fileContents = "WEBVTT\n\n";
  }

  resetFile() {
    this.fileContents = "WEBVTT\n\n";
    this.contentText = undefined;
  }

  startCheckTimerContentTmpSave(startTime: string, content: string) {
    this.fileContents += `${startTime} --> `;

    this.contentText = content;
  }

  finishCheckTimer(endTime: string) {
    if (this.contentText === undefined) return;
    this.fileContents += `${endTime}\n ${this.contentText}\n\n`;

    this.contentText = undefined;
  }

  download(filename: string) {
    const file = new File([this.fileContents], `${filename}.vtt`, { type: "octet/stream" });
    const url = URL.createObjectURL(file);

    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href = url;
    a.click();
    document.body.removeChild(a);
    a.remove();
    a.download = `${filename}.vtt`;
    URL.revokeObjectURL(url);
    this.resetFile();
  }
}

export default VTT;
