import { css } from "@emotion/react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import * as datas from "../../data/index";
import { Select, Button } from "../../design";

export default function HomePage() {
  const navigate = useNavigate();
  const [position, setPosition] = useState<string>();
  const keys = Object.keys(datas);

  const onEnter = useCallback(() => {
    navigate(`/interview?position=${position}`);
  }, [navigate, position]);

  return (
    <div>
      <h2>당신의 직군은 무엇입니까?</h2>
      <Select onChange={(e) => setPosition(e.target.value)}>
        {keys.map((key) => (
          <option value={key} key={key}>
            {key}
          </option>
        ))}
      </Select>
      {position && (
        <section css={enterButtonWrapper}>
          <Button size="large" color="primary" onClick={onEnter}>
            입장
          </Button>
        </section>
      )}
    </div>
  );
}

const enterButtonWrapper = css`
  width: 100%;
  text-align: center;
  margin-top: 24px;
`;
