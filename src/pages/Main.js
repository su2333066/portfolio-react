import React from "react";
import axios from "axios";
import { StoreContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

function Main() {
  const { loginUser } = React.useContext(StoreContext);
  const navigation = useNavigate();

  const [algorithm, setAlgorithm] = React.useState([]);

  const 메뉴보이기 = () => {
    const menu = document.querySelector(".navbar__menu");
    menu.classList.toggle("active");
  };

  const 알고리즘생성 = () => {
    navigation("/algorithm");
  };

  const 알고리즘목록가져오기 = async () => {
    await axios({
      url: "http://localhost:4000/algorithm",
    }).then((response) => {
      setAlgorithm(response.data);
    });
  };

  const 로그인페이지로이동 = () => {
    navigation("/login");
  };

  React.useEffect(() => {
    알고리즘목록가져오기();
  }, []);

  return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar__logo">
          <i class="fa-solid fa-diagram-project"></i>
        </a>
        <ul className="navbar__menu">
          <li>
            <a href="/">Algorithm</a>
          </li>
        </ul>

        {loginUser.length !== 0 ? (
          <a href="/" className="navbar__user">
            <i class="fa-solid fa-user">&nbsp;{loginUser.nickname} 님&nbsp;</i>
          </a>
        ) : (
          <button onClick={로그인페이지로이동} className="login-btn">
            로그인
          </button>
        )}

        <button onClick={메뉴보이기} className="navbar__toggleBtn">
          <i class="fa-solid fa-bars"></i>
        </button>
      </nav>

      <div className="container">
        <div className="project-container">
          <div className="top-bar">
            <div className="tag-list">
              <p>태그 목록</p>
              <ul>
                <li>
                  <a href="/">전체</a>
                </li>
                <li>
                  <a href="/">프로그래머스</a>
                </li>
                <li>
                  <a href="/">백준</a>
                </li>
              </ul>
            </div>
            <div className="serch-add">
              <input name="keyword" placeholder="키워드 검색"></input>
              <button className="serch-btn">검색</button>
              <button className="add-btn" onClick={알고리즘생성}>
                추가
              </button>
            </div>
          </div>
          <div className="content">
            {algorithm.length > 0 &&
              algorithm.map((item, index) => {
                return (
                  <div key={index} className="algorithm-box">
                    <div>{item.title}</div>
                    <div>{item.level}</div>
                    <div>{item.tag}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
