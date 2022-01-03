import { css } from '@emotion/react'
import './App.css';

function App() {
  return (
    <div css={test}>testtt</div>
  );
}

export default App;

const test = css`
  color: red;
`