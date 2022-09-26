import { createContext, useState } from "react";

type IReactComponent<P = any> = React.FC<P> | React.ComponentClass<P> | React.ClassicComponentClass<P>;

interface IModalContext {
  modalList: [];
}

const defaultState: IModalContext = {
  modalList: [],
};

export const ModalContext = createContext<IModalContext>(defaultState);

const ModalProvider = ModalContext.Provider;

export function withModalProvider<Props>(Component: IReactComponent<Props>) {
  return function WithModalProviderFun(props: any) {
    const [modalState, setModalState] = useState(defaultState);

    return (
      <ModalProvider value={modalState}>
        <Component {...props} />
      </ModalProvider>
    );
  };
}
