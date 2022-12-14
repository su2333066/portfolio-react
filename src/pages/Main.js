import React from "react";
import axios from "axios";
import { StoreContext } from "../App";
import { useNavigate } from "react-router-dom";

function Main() {
  const { loginUser } = React.useContext(StoreContext);
  const navigation = useNavigate();

  const [algorithm, setAlgorithm] = React.useState([]);
  const [search, setSearch] = React.useState("");

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

  const 태그목록가져오기 = async (event) => {
    const tagName = event.target.name;
    await axios({
      url: `http://localhost:4000/algorithm/:${tagName}`,
      params: { tagName },
    }).then((response) => {
      setAlgorithm(response.data);
    });
  };

  const 데이터변경 = (event) => {
    setSearch(event.target.value);
  };

  const 알고리즘검색 = async () => {
    await axios({
      url: "http://localhost:4000/search",
      params: { search },
    }).then((response) => {
      setAlgorithm(response.data);
    });
  };

  const 로그인페이지로이동 = () => {
    navigation("/login");
  };

  React.useEffect(() => {
    if (Object.keys(loginUser).length !== 0) 알고리즘목록가져오기();
  }, [loginUser]);

  return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar__logo">
          <i className="fa-solid fa-diagram-project"></i>
        </a>
        <ul className="navbar__menu">
          <li>
            <a href="/">Algorithm</a>
          </li>
        </ul>

        {Object.keys(loginUser).length !== 0 ? (
          <a href="/" className="navbar__user">
            <i className="fa-solid fa-user">
              &nbsp;{loginUser.nickname} 님&nbsp;
            </i>
          </a>
        ) : (
          <button onClick={로그인페이지로이동} className="login-btn">
            로그인
          </button>
        )}

        <button onClick={메뉴보이기} className="navbar__toggleBtn">
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>

      <div className="container">
        <div className="project-container">
          <div className="top-bar">
            <div className="tag-list">
              <p>태그 목록</p>
              <ul>
                <li>
                  <button onClick={태그목록가져오기} name="전체">
                    전체
                  </button>
                </li>
                <li>
                  <button onClick={태그목록가져오기} name="프로그래머스">
                    프로그래머스
                  </button>
                </li>
                <li>
                  <button onClick={태그목록가져오기} name="백준">
                    백준
                  </button>
                </li>
              </ul>
            </div>
            <div className="serch-add">
              <input
                name="keyword"
                placeholder="키워드 검색"
                onChange={데이터변경}
              ></input>
              <button onClick={알고리즘검색} className="serch-btn">
                검색
              </button>
              <button className="add-btn" onClick={알고리즘생성}>
                추가
              </button>
            </div>
          </div>
          <div className="content">
            {algorithm.length > 0 &&
              algorithm.map((item, index) => {
                return (
                  <button
                    onClick={() => {
                      navigation(`detail/${item.seq}`);
                    }}
                    key={index}
                    className="algorithm-box"
                  >
                    <div className="level">{`Lv.${item.level}`}</div>
                    <div className="title">
                      <p>{item.title}</p>
                    </div>
                    <div className="tag">
                      {item.tag.split(",").map((tag, index) => {
                        return <span key={index}>{tag}</span>;
                      })}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
