import { css } from "@emotion/react";

import Portal from "../../util/portal";
import { IModalProps, withModalProvider } from "./ModalContext";

function Modal({ visible, children, zIndex, onClose }: IModalProps) {
  return (
    <Portal>
      {visible && (
        <div onClick={onClose}>
          <div css={modalMask}></div>
          <section css={modalWrapper}>
            <div css={modalContentsWrapper} onClick={(e) => e.stopPropagation()}>
              {children}
            </div>
          </section>
        </div>
      )}
    </Portal>
  );
}

const modalMask = css`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background-color: #00000073;
`;

const modalWrapper = css`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const modalContentsWrapper = css`
  width: 60%;
  max-height: 80%;
  overflow: scroll;
  background-color: white;
`;

export default withModalProvider(Modal);
