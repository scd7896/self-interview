import { useCallback, useMemo } from "react";

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
const colors = ["aqua", "azure", "beige", "bisque", "black", "blue", "brown", "chocolate", "coral"];
const grammar = "#JSGF V1.0; grammar colors; public <color> = " + colors.join(" | ") + " ;";
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

export default function useSpeechRecognition() {
  const speech = useMemo(() => {
    const speechObj = new SpeechRecognition();
    speechObj.grammars = speechRecognitionList;
    speechObj.continuous = false;
    speechObj.lang = "ko-KR";
    speechObj.interimResults = false;
    speechObj.maxAlternatives = 1;
    speechObj.addEventListener("start", () => {
      console.log("start");
    });
    speechObj.onresult = (event: any) => {
      console.log(event.results);
    };
    speechObj.onspeechend = function () {
      speechObj.stop();
    };
    speechObj.onnomatch = function (event: any) {
      console.log("nomatch", event);
    };
    recognition.onerror = function (event: any) {
      console.log("error", event);
    };
    return speechObj;
  }, []);

  const startSpeech = useCallback(() => {
    speech.start();
  }, [speech]);

  const endSpeech = useCallback(() => {
    speech.stop();
  }, [speech]);

  return {
    startSpeech,
    endSpeech,
  };
}
