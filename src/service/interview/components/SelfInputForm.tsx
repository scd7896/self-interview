import { useState } from "react";
import { onSubmit as submitHelper } from "web-form-helper";
import { Button, Input } from "../../../design";
import { v4 as uuidV4 } from "uuid";

interface IProp {
  defaultValue?: Array<string>;
  onSubmit?: (param: { questions?: Array<string> }) => void;
}

export default function SelfInputForm({ defaultValue, onSubmit }: IProp) {
  const [questions, setQuestions] = useState(defaultValue?.map((it) => ({ key: uuidV4(), value: it })));

  return (
    <form
      onSubmit={submitHelper((arg: any) => onSubmit?.(arg))}
      onKeyDown={(e) => {
        if (e.key === "Enter") e.preventDefault();
      }}
    >
      <section>
        {questions?.map((it, index) => (
          <Input
            description="입력해주세요"
            label={`${index + 1}번째 질문`}
            key={it.key}
            name={`question.${index}`}
            defaultValue={it.value}
          />
        ))}
      </section>
      <Button
        type="button"
        color="primary"
        size="large"
        onClick={() => {
          setQuestions((prev) => {
            if (prev) {
              return [...prev, { key: uuidV4(), value: "" }];
            }
            return [{ key: uuidV4(), value: "" }];
          });
        }}
      >
        추가
      </Button>
      <footer>
        <Button type="submit" color="primary" size="large">
          확인
        </Button>
        <Button type="reset" color="default" size="large">
          리셋
        </Button>
      </footer>
    </form>
  );
}
