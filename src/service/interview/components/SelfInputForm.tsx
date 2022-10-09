import { useState } from "react";
import { onSubmit as submitHelper } from "web-form-helper";
import { Button, Input } from "../../../design";
import { v4 as uuidV4 } from "uuid";
import { css } from "@emotion/react";

interface IProp {
  defaultValue?: Array<string>;
  onSubmit?: (param: { questions?: Array<string> }) => void;
}

export default function SelfInputForm({ defaultValue, onSubmit }: IProp) {
  const [questions, setQuestions] = useState(
    defaultValue?.map((it) => ({ key: uuidV4(), value: it })) || [{ key: uuidV4(), value: "" }],
  );

  return (
    <form
      css={form}
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
            name={`questions.${index}`}
            defaultValue={it.value}
            placeholder="입력해주십쇼"
          />
        ))}
      </section>
      <section css={addWrapper}>
        <Button
          type="button"
          color="secondary"
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
      </section>
      <footer css={footer}>
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

const form = css`
  padding: 16px;
`;

const footer = css`
  text-align: right;

  button + button {
    margin-left: 8px;
  }
`;

const addWrapper = css`
  margin-top: 12px;
`;
