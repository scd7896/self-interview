import { css } from "@emotion/react";
import colors from "./color";
import color from "./color";

const defaultSize = css`
  padding: 10px 16px;
  font-size: 14px;
`;
const largeSize = css`
  padding: 12px 16px;
  font-size: 16px;
`;

const smallSize = css`
  padding: 8px 16px;
  font-size: 12px;
`;

const buttonSizes = {
  default: defaultSize,
  large: largeSize,
  small: smallSize,
};

const primaryColor = css`
  background: ${color.primary[600]};
  color: ${color.netural[0]};
  &:hover {
    background: ${color.primary[500]};
  }
  &:active {
    background: ${color.primary[700]};
  }
`;

const defaultColor = css``;

const dangerColor = css`
  background: ${color.danger[600]};
  color: ${color.netural[0]};
  &:hover {
    background: ${color.danger[500]};
  }
  &:active {
    background: ${color.danger[700]};
  }
`;

const buttonColors = {
  primary: primaryColor,
  default: defaultColor,
  danger: dangerColor,
};

interface IProp extends React.ButtonHTMLAttributes<any> {
  size: "default" | "large" | "small";
  color: "primary" | "danger" | "default";
  children: any;
}

export default function Button(param: IProp) {
  return (
    <button {...param} css={button(param)}>
      {param.children}
    </button>
  );
}

const button = ({ size, color }: IProp) => css`
  border: none;
  border-radius: 4px;
  line-height: 1;
  ${buttonSizes[size]}
  ${buttonColors[color]}
	&:disabled {
    background-color: ${colors.netural[150]};
    color: ${colors.netural[600]};
  }
`;
