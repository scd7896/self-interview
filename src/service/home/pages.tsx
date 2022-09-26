import { css } from "@emotion/react";
import { useCallback, useState } from "react";

import * as datas from "../../data/index";
import { Select, Button } from "../../design";
import colors from "../../design/color";
import { Link, useHistory } from "../../ioc/history";

export default function HomePage() {
  const { push } = useHistory();
  const [position, setPosition] = useState<string>();
  const keys = Object.keys(datas);

  const onEnter = useCallback(() => {
    push(`/interview?position=${position}`);
  }, [push, position]);

  return (
    <div>
      <h2>당신의 직군은 무엇입니까?</h2>
      <Select onChange={(e) => setPosition(e.target.value)}>
        {keys.map((key) => (
          <option value={key} key={key}>
            {key}
          </option>
        ))}
        <option value="selfInterview">직접입력</option>
      </Select>
      {position && (
        <section css={enterButtonWrapper}>
          <Button size="large" color="primary" onClick={onEnter}>
            입장
          </Button>
        </section>
      )}
      <section css={reviewDescriptionWrapper}>
        녹화했던 영상을 리뷰하면서{" "}
        <Link css={link} to="/review">
          피드백
        </Link>{" "}
        하시고 싶으신가요?
      </section>
    </div>
  );
}

const enterButtonWrapper = css`
  width: 100%;
  text-align: center;
  margin-top: 24px;
`;

const reviewDescriptionWrapper = css`
  margin-top: 24px;
  color: ${colors.netural[900]};
`;

const link = css`
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  color: ${colors.primary[700]};
`;
