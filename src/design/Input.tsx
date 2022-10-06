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
      <input css={inputStyle} {...args} />
      {args.description && <section css={description}>{args.description}</section>}
    </section>
  );
}

const wrapper = css`
  box-sizing: border-box;

  & + & {
    margin-top: 8px;
  }
`;

const inputStyle = css`
  width: 100%;
  border: 1px solid ${colors.netural[200]};
  padding: 10px 16px;
  box-sizing: border-box;
  color: ${colors.netural[800]};
  border-radius: 4px;
  font-size: 14px;

  &:focus {
    outline: 2px solid ${colors.primary[600]};
  }

  &::placeholder {
    color: ${colors.netural[500]};
  }
`;

const description = css`
  color: ${colors.netural[600]};
  font-size: 12px;
  line-height: 16px;
  margin-top: 4px;
`;

const label = css`
  display: block;
  color: ${colors.netural[800]};
  font-size: 12px;
  line-height: 16px;
  font-weight: 700;
  margin-bottom: 4px;
`;
