import { Position } from "./index.d";

const frontEndData: Position = {
  realGame: {
    easy: [
      "const, let var의 차이를 설명해주세요",
      "쿠키(Cookies)와 세션저장소(sessionStorage)와 로컬저장소(localStorage)의 차이점을 설명해주세요.",
      "CSS<link>를 <head></head>사이에 쓰는 것과 JS<script>를 <body></body>뒤에 사용하는 것은 좋은 사용법일까요? 어디에 배치하는 게 좋을까요?",
      `“reset” CSS가 무엇인지, 어떻게 유용한지 설명해주세요.`,
    ],
    midium: [
      "event loop를 설명해주세요",
      "data-속성은 무엇을 하는 것인가요? 사용했을 때 이점은 무엇인가요?",
      `CSS 스프라이트(CSS Sprites)를 설명하고, 페이지나 사이트를 어떻게 향상하는지 설명해주세요.`,
      "CSS에서 'C’는 Cascading을 의미합니다. Cascading에 관해서 설명해주세요. 또 cascading system의 장점은 무엇인가요?",
      "this는 JavaScript에서 어떻게 작동하는지 설명해주세요.",
      "webpack과 바벨을 설명해주세요",
    ],
    hard: [
      "이벤트 위임에 대해 설명해주세요",
      "Progressive rendering이 진행 되는 과정을 설명해주세요.",
      "Image Replacement와 스크린 리더를 같이 설명해주세요.",
      "document load event와 DOMContentLoaded event의 차이점은 무엇인가요?",
    ],
  },
  theory: {
    easy: [
      "콜바이밸류와 콜바이레퍼런스를 설명해주세요",
      "null과 unedefined 그리고 undeclared의 차이점은 무엇인가요?",
      "클로져(Closure)는 무엇이며, 어떻게/왜 사용하는지 설명해주세요.",
      "mutable object와 immutable object에 관해 설명해주세요.",
      "TCP와 UDP를 설명해주세요",
      "스코프 체이닝에 대해 설명해주세요",
    ],
    midium: [
      "http 통신에 대해 설명해주세요",
      "Socket과 http의 차이를 설명해주세요.",
      "CDN은 무엇일까요?",
      "XSS와 CSRF에 대해 설명해주세요",
    ],
    hard: [
      "프로세스와 스레드에 대해 설명해주세요",
      "event delegation에 관해 설명해주세요.",
      "Long-Polling과 Websocket, Server-Sent Event에 대해 설명해주세요.",
      "URL을 검색하고 일어나는 일들을 모두 설명해주세요.",
    ],
  },
};

export default frontEndData;
