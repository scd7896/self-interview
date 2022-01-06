import { css } from "@emotion/react";
import React, { useEffect, useRef } from "react";
import colors from "./color";

export default function Select(props: React.SelectHTMLAttributes<any>) {
  const selectRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    if (selectRef.current) {
      if (!props.defaultValue) {
        selectRef.current.selectedIndex = -1;
      }
    }
  }, [props.defaultValue]);
  return (
    <select {...props} css={selectBox} ref={selectRef}>
      {props.children}
    </select>
  );
}

const selectBox = css`
  border: 1px solid ${colors.netural[200]};
  height: 40px;
  width: 100%;
  &:active {
    border: 1px solid ${colors.primary[600]};
  }

  &:focus {
    border: 1px solid ${colors.primary[600]};
  }
`;
