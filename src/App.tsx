import "./App.css";
import Routers from "./Routers";
import { Header, Body } from "./design/Layout";

function App() {
  return (
    <>
      <Header>
        <h2>Self-Interview (면접 혼자 연습하기)</h2>
      </Header>
      <Body>
        <Routers />
      </Body>
    </>
  );
}

export default App;
