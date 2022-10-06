import { useCallback, useMemo, useState } from "react";
import * as datas from "../../../data";
import { Position, Difficulty, DiffcultyKeys } from "../../../data/index.d";
import { useHistory } from "../../../ioc/history";
import { difficulty } from "../../../util/constant";

const questions: Record<string, Position> = datas;

export default function useQuestion() {
  const [questionIndex, setQuestionIndex] = useState<number>();
  const [selectedQuestion, setSelectedQuestion] = useState<string[]>();
  const { getParam } = useHistory();
  const position = getParam("position");

  const positionQuestion = useMemo(() => (position ? questions[position] : null), [position]);

  const selectedQuestionPick = useCallback((diffcultyQuestions: Difficulty) => {
    const length = 3;
    const diffcultyKeys: DiffcultyKeys = Object.keys(diffcultyQuestions) as DiffcultyKeys;

    const getRandomThreeIndex = (maxIndex: number) => {
      const questionIndexArr: number[] = [];
      function getRandomInt() {
        return Math.floor(Math.random() * maxIndex);
      }

      while (questionIndexArr.length < length) {
        if (questionIndexArr.length >= length) break;

        const index = getRandomInt();
        const result = questionIndexArr.findIndex((questionIndex) => index === questionIndex);
        if (result === -1) {
          questionIndexArr.push(index);
        }
      }
      return questionIndexArr;
    };

    return diffcultyKeys.reduce<string[]>((acc, key) => {
      const question = diffcultyQuestions[key];
      if (question && question.length <= length) {
        return [...acc, ...question];
      }

      if (question && question.length > length) {
        const [first, second, third] = getRandomThreeIndex(question.length - 1);
        return [...acc, question[first], question[second], question[third]];
      }

      return acc;
    }, []);
  }, []);

  const randomPickQuestion = useCallback(() => {
    if (positionQuestion) {
      const realGameResult = selectedQuestionPick(positionQuestion.realGame);
      const theoryResult = selectedQuestionPick(positionQuestion.theory);

      const result = [...realGameResult, ...theoryResult];
      setSelectedQuestion(result);
      setQuestionIndex(undefined);
    }
  }, [positionQuestion, selectedQuestionPick]);

  const resetQuestion = useCallback(() => {
    setSelectedQuestion(undefined);
    setQuestionIndex(undefined);
  }, []);

  const getPositionQuestionCsvText = useCallback(() => {
    let csvText = "";
    if (positionQuestion) {
      difficulty.map((difficult) => {
        const realGameQuestion = positionQuestion.realGame[difficult];
        if (realGameQuestion) {
          realGameQuestion.map((question) => (csvText += `${question.replaceAll(",", `","`)}\n`));
        }
      });
      difficulty.map((difficult) => {
        const theoryQuestion = positionQuestion.theory[difficult];
        if (theoryQuestion) theoryQuestion.map((question) => (csvText += `${question.replaceAll(",", `","`)}\n`));
      });
    }
    return csvText;
  }, [positionQuestion]);

  const questionDownload = useCallback(() => {
    if (positionQuestion) {
      const csvText = getPositionQuestionCsvText();
      const file = new File([csvText], "question.csv", { type: "text/csv" });
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = "question.csv";
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } else {
      throw "선택되어있는 question이 없습니다.";
    }
  }, [positionQuestion, getPositionQuestionCsvText]);

  return {
    randomPickQuestion,
    selectedQuestion,
    questionIndex,
    setQuestionIndex,
    resetQuestion,
    questionDownload,
    setSelectedQuestion,
  };
}
