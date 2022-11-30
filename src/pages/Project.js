import React from "react";
import { StoreContext } from "../App";

function Project() {
  const { loginUser } = React.useContext(StoreContext);
  const menu = document.querySelector(".navbar__menu");

  const 메뉴보이기 = () => {
    menu.classList.toggle("active");
  };

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
          <li>
            <a href="/project">Project</a>
          </li>
          <li>
            <a href="/todo">My Task</a>
          </li>
        </ul>

        <a href="/" className="navbar__user">
          <i class="fa-solid fa-user">&nbsp;{loginUser.nickname} 님&nbsp;</i>
        </a>

        <button onClick={메뉴보이기} className="navbar__toggleBtn">
          <i class="fa-solid fa-bars"></i>
        </button>
      </nav>

      <div className="container">
        <div className="project-container">
          <div className="tagbar">
            <div className="tag-list">
              <p>태그 목록</p>
              <ul>
                <li>
                  <a href="/">전체</a>
                </li>
                <li>
                  <a href="/">React</a>
                </li>
                <li>
                  <a href="/">JavaScript</a>
                </li>
              </ul>
            </div>
            <div className="serch">
              <input name="keyword" placeholder="키워드 검색"></input>
              <button>Search</button>
            </div>
          </div>
          <div className="content"></div>
        </div>
      </div>
    </div>
  );
}

export default Project;
