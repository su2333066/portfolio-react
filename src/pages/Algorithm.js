import axios from "axios";
import React from "react";
axios.defaults.withCredentials = true;
function Algorithm() {
  const [data, setData] = React.useState({});

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

  return (
    <div className="">
      <div className="">
        <div className="">
          <input
            name="title"
            placeholder="제목을 입력해주세요"
            onChange={데이터변경}
          />
          <input
            name="tag"
            placeholder="태그를 입력해주세요"
            onChange={데이터변경}
          />
          <input
            name="link"
            placeholder="문제 링크를 입력해주세요"
            onChange={데이터변경}
          />
          <input name="level" placeholder="난이도 설정" onChange={데이터변경} />
          <input
            name="content"
            placeholder="내용을 입력해주세요"
            onChange={데이터변경}
          />
        </div>

        <button type="button" onClick={알고리즘생성하기}>
          저장
        </button>
      </div>
    </div>
  );
}

export default Algorithm;
