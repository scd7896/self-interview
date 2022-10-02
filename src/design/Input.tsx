import { css, Interpolation, Theme } from "@emotion/react";
import { ClassAttributes, InputHTMLAttributes } from "react";
import colors from "./color";

interface IProp {
  label?: string;
  description?: string;
}

type PropTypes = ClassAttributes<HTMLInputElement> &
  InputHTMLAttributes<HTMLInputElement> & {
    css?: Interpolation<Theme>;
  } & IProp;

export default function Input(args: PropTypes) {
  return (
    <section css={wrapper}>
      {args.label && <label css={label}>{args.label}</label>}
      <section>
        <input css={inputStyle} {...args} />
      </section>
      {args.description && <section css={description}>{args.description}</section>}
    </section>
  );
}

const wrapper = css`
  box-sizing: border-box;
`;

const inputStyle = css`
  width: 100%;
  border: 1px solid ${colors.netural[200]};
  padding: 10px 16px;
  box-sizing: border-box;
`;

const description = css`
  color: ${colors.netural[600]};
  font-size: 12px;
  line-height: 16px;
`;

const label = css`
  color: ${colors.netural[800]};
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
`;
