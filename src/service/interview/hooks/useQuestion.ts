import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import * as datas from "../../../data";
const questions: any = datas;

export default function useQuestion() {
  const [searchParams] = useSearchParams();
  const position = searchParams.get("position");

  const positionQuestion = useMemo(() => (position ? questions[position] : null), [position]);

  return {
    positionQuestion,
  };
}
