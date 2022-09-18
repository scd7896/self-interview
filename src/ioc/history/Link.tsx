import { SerializedStyles } from "@emotion/react";
import { Link } from "react-router-dom";

interface IProp {
  css?: SerializedStyles;
  to: string;
  children?: React.ReactChildren | string;
}

export default function CustomLink({ css, to, children }: IProp) {
  return (
    <Link css={css} to={to}>
      {children}
    </Link>
  );
}
