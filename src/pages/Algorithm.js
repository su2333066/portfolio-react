import axios from "axios";
import React from "react";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

axios.defaults.withCredentials = true;

function Algorithm() {
  const [data, setData] = React.useState({
    title: "",
    tag: "",
    link: "",
    level: 1,
    content: "",
  });

  const editorRef = React.useRef("");

  const 데이터변경 = (event) => {
    const cloneData = { ...data };
    cloneData[event.target.name] = event.target.value;
    setData(cloneData);
  };

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

  return (
    <div className="algorithm-body">
      <div className="algorithm-container">
        <div className="title">
          <p>제목 :</p>
          <input name="title" onChange={데이터변경} />
        </div>
        <div className="tag">
          <p>태그 :</p>
          <input name="tag" onChange={데이터변경} />
        </div>
        <div className="link">
          <p>링크 :</p>
          <input name="link" onChange={데이터변경} />
        </div>
        <div className="level">
          <p>레벨 :</p>
          <button name="level" type="radio" value="1" onClick={데이터변경}>
            Lv.1
          </button>
          <button name="level" type="radio" value="2" onClick={데이터변경}>
            Lv.2
          </button>
          <button name="level" type="radio" value="3" onClick={데이터변경}>
            Lv.3
          </button>
          <button name="level" type="radio" value="4" onClick={데이터변경}>
            Lv.4
          </button>
          <button name="level" type="radio" value="5" onClick={데이터변경}>
            Lv.5
          </button>
        </div>

        <Editor
          ref={editorRef}
          previewStyle="vertical"
          height="600px"
          theme="dark"
          name="content"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          onChange={에디터내용가져오자}
        />
        <button className="save-Btn" type="button" onClick={알고리즘생성하기}>
          저장
        </button>
      </div>
    </div>
  );
}

export default Algorithm;
