//https://www.youtube.com/watch?v=I4MCNvQc7RU
//API문서 :https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/result_event

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
//오 그렇구만 이거 크롬에 내장된 기능이라서 따로 임포트하지않아도 되는거구나
//자바스크립트가 브라우저에서 읽히는거니까!! 대신 다른 브라우저에서는 작동안되겠네??
const recognition = new SpeechRecognition();
recognition.continuous = true;
//continuous 연속 렌더링 상태를 유지하는듯
const start = document.querySelector("#start"),
  status = document.querySelector("#status");
const stop = document.querySelector("#stop"),
  preview = document.querySelector("#preview"),
  command = document.querySelector("#command");

const styleTag = document.createElement("style");
styleTag.type = "text/css"; //body {font-size:9pt;}
document.body.appendChild(styleTag); //??어떻게 body에 css가 들어가?? -> 들어감! 해봄!

const handleStart = () => {
  status.innerText = "I'm Listening...";
  recognition.start();
};
const handleStop = () => {
  status.innerText = "Not Listening";
  command.innerText = "";
  recognition.stop();
};

let htmlString = "";
const processResult = (result) => {
  let processed = result.trim().toLowerCase();
  if (processed.includes("html")) {
    if (processed.includes("content")) {
      const [_, content] = processed.split("html content ");
      console.log(content);
      htmlString += content;
    } else if (processed.includes("open")) {
      const [_, tag] = processed.split("html open ");
      console.log(`<${tag}>`);
      htmlString += `<${tag}>`;
    } else if (processed.includes("finish")) {
      const [_, tag] = processed.split("hrml finish ");
      console.log(`</${tag}`);
      htmlString += `</${tag}>`;
      preview.innerHTML += htmlString;
      htmlString = "";
    }
  } else if (processed.includes("css")) {
    if (processed.includes("open")) {
      const [_, tag] = processed.split("css open ");
      styleTag.innerHTML += `${tag} {`;
    } else if (processed.includes("finish")) {
      styleTag.innerHTML += "}";
    } else if (processed.includes("style")) {
      const [_, payload] = processed.split("css style ");
      if (payload) {
        const [prop, value] = payload
          .replaceAll(" pixels", "px")
          .replaceAll(" ", "-")
          .split("-is-");
        if (prop && value) {
          styleTag.innerHTML += `${prop}:${value};`;
        }
      }
    }
  }
};

const handleResults = (event) => {
  //이벤트가 음성인식인가..?
  const { results, resultIndex } = event;
  const { transcript, confidence } = results[resultIndex][0];
  if (confidence > 0.7) {
    command.innerHTML = `Command : ${transcript}`;
    processResult(transcript);
  }
};

start.addEventListener("click", handleStart);
stop.addEventListener("click", handleStop);
recognition.addEventListener("result", handleResults);
