import { css } from "@emotion/react";
import Portal from "../../util/portal";
import { withModalProvider } from "./ModalContext";

function Modal() {
  return (
    <Portal>
      <div>test</div>
    </Portal>
  );
}

const wrapper = css``;

export default withModalProvider(Modal);
