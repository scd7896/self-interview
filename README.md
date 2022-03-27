# Self-Interview

<img width="1260" alt="스크린샷 2022-03-27 오후 4 21 08" src="https://user-images.githubusercontent.com/46440142/160271134-7fb5dbb9-bd8a-49e9-afc9-322c078088f4.png" />

## Description
혼자서 인터뷰를 하고 혼자서 영상을 보며 피드백 할 수 있는 사이트.
서버 통신 없이 클라이언트의 API들을 조합하여 만듦.

## 구현 기능
- 카메라에 찍히는 자신을 녹화하면서 실시간 자신의 모습을 개발 함.
- 면접 질문을 랜덤으로 뽑아서 하나씩 보여주고, 문제를 넘길 때마다, 기록해서 vtt 파일로 저장하는 기능 개발 함.
- vtt파일과 녹화한 영상을 가지고 자막과 함께 자신의 녹화된 모습을 보면서 피드백할 수 있도록 개발 함.

## 사용한 API
- getUserMedia: 사용자의 카메라와 마이크의 입력을 받을 수 있는 API로, 영상과 사운드 데이터를 실시간 stream 방식으로 발행 하는 객체로 이용함.
- MediaRecorder: js native객체로 Media 객체에서 실시간으로 영상과 사운드 데이터를 Blob 파일로 변환 할 수 있도록 해서 다시 데이터를 발행 함.
- showSaveFilePicker: 사용자 PC에 파일을 저장 할 수 있도록 도와주는 함수로 파일 소켓을 열어서 데이터를 주입 받을 수 있는 방향으로 개발 함.

## 기술 스택
- React (CRA-eject)
- emotion
- React-router-dom v6

## 후기 블로그 글
https://kimserver-frontend.tistory.com/7
