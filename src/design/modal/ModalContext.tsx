import { createContext, useEffect, useState } from "react";

type IReactComponent<P = any> = React.FC<P> | React.ComponentClass<P> | React.ClassicComponentClass<P>;

interface IModalContext {
  modalList: [];
}

const defaultState: IModalContext = {
  modalList: [],
};

export interface IModalProps {
  visible?: boolean;
  onClose?: () => void;
  children?: React.ReactChild | React.ReactChild[];
  zIndex?: number;
}

export const ModalContext = createContext<IModalContext>(defaultState);

const ModalProvider = ModalContext.Provider;

export function withModalProvider(Component: IReactComponent<IModalProps>) {
  return function WithModalProviderFun(props: IModalProps) {
    const [modalState, setModalState] = useState(defaultState);

    return (
      <ModalProvider value={modalState}>
        <Component {...props} />
      </ModalProvider>
    );
  };
}
