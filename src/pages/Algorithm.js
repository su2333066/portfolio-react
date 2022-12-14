import axios from "axios";
import React from "react";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

axios.defaults.withCredentials = true;

const levelButtons = [
  {
    name: "Lv.1",
    value: 1,
  },
  {
    name: "Lv.2",
    value: 2,
  },
  {
    name: "Lv.3",
    value: 3,
  },
  {
    name: "Lv.4",
    value: 4,
  },
  {
    name: "Lv.5",
    value: 5,
  },
];

function Algorithm() {
  const [data, setData] = React.useState({
    title: "",
    tag: [],
    link: "",
    level: 1,
    content: "",
    answer: "",
  });

  const editorRef = React.useRef("");

  const 알고리즘생성하기 = async () => {
    await axios({
      url: "http://localhost:4000/algorithm",
      method: "POST",
      data: data,
    }).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
      }

      if (response.data.code === "success") {
        window.location = "/";
      }
    });
  };

  const 에디터내용가져오자 = () => {
    const editorContent = editorRef.current.getInstance().getHTML();
    const cloneData = { ...data };
    cloneData.content = editorContent;
    setData(cloneData);
  };

  const 데이터변경 = (event) => {
    const cloneData = { ...data };
    cloneData[event.target.name] = event.target.value;
    setData(cloneData);
  };

  const 태그추가 = (event) => {
    if (event.key === "Enter") {
      const cloneData = { ...data };
      cloneData.tag.push(event.target.value);
      setData(cloneData);
      event.target.value = "";
    }
  };

  const 태그삭제 = (event) => {
    const tagIndex = event.target.value;
    const cloneData = { ...data };
    cloneData.tag.splice(tagIndex, 1);
    setData(cloneData);
  };

  const 코드미러내용가져오자 = (value) => {
    const cloneData = { ...data };
    cloneData.answer = value;
    setData(cloneData);
  };

  return (
    <div className="algorithm-body">
      <div className="algorithm-container">
        <div className="title">
          <p>제목 :</p>
          <input name="title" placeholder="Input title" onChange={데이터변경} />
        </div>
        <div className="tag">
          <p>태그 :</p>
          <input name="tag" placeholder="Press enter" onKeyUp={태그추가} />
          {data.tag.length > 0 &&
            data.tag.map((tag, index) => {
              return (
                <span key={index}>
                  {tag}
                  <button value={index} onClick={태그삭제}>
                    ❌
                  </button>
                </span>
              );
            })}
        </div>
        <div className="link">
          <p>링크 :</p>
          <input name="link" placeholder="Input link" onChange={데이터변경} />
        </div>
        <div className="level">
          <p>레벨 :</p>
          {levelButtons.map((item, index) => {
            const className = data.level == item.value ? "button-active" : "";

            return (
              <button
                name="level"
                type="radio"
                className={className}
                key={`levelButtons-${index}`}
                value={item.value}
                onClick={데이터변경}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <Editor
          ref={editorRef}
          previewStyle="vertical"
          height="300px"
          theme="dark"
          name="content"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          onChange={에디터내용가져오자}
        />

        <CodeMirror
          value={data.answer}
          height="300px"
          extensions={[javascript({ jsx: true })]}
          onChange={코드미러내용가져오자}
        />

        <button className="save-Btn" type="button" onClick={알고리즘생성하기}>
          저장
        </button>
      </div>
    </div>
  );
}

export default Algorithm;
