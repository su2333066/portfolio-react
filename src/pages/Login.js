import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;
function Login() {
  const navigation = useNavigate();
  const [data, setData] = React.useState({});

  const 데이터변경 = (event) => {
    const cloneData = { ...data };
    cloneData[event.target.name] = event.target.value;
    setData(cloneData);
  };

  const 회원가입하기 = () => {
    navigation("/join");
  };

  const 로그인하기 = async () => {
    await axios({
      url: "http://localhost:4000/login",
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
    <div className="login-body">
      <div className="login-container">
        <div className="login-input">
          <input
            name="id"
            placeholder="아이디 입력해주세요"
            onChange={데이터변경}
          />
          <input
            type="password"
            name="pw"
            placeholder="비밀번호를 입력해주세요"
            onChange={데이터변경}
          />
        </div>
        <div className="login-btn">
          <button type="button" onClick={로그인하기}>
            로그인
          </button>
          <button type="button" onClick={회원가입하기}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
