import { useContext } from "react";
import { ModalContext } from "./ModalContext";

export default function useModal() {
  const { modalList } = useContext(ModalContext);
  return { modalList };
}
