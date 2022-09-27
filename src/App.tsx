import "./App.css";
import Routers from "./Routers";
import { Header, Body } from "./design/Layout";
import Modal from "./design/modal/Modal";

function App() {
  return (
    <>
      <Header>
        <h2>Self-Interview (면접 혼자 연습하기)</h2>
      </Header>
      <Body>
        <Routers />
        <Modal visible>
          {new Array(100).fill(1).map((it, index) => (
            <h1 key={index}>test</h1>
          ))}
        </Modal>
      </Body>
    </>
  );
}

export default App;
