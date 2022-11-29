import React from "react";
import { StoreContext } from "../App";

function Main() {
  const { loginUser } = React.useContext(StoreContext);
  const menu = document.querySelector(".navbar__menu");

  const 메뉴보이기 = () => {
    menu.classList.toggle("active");
  };

  return (
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
          <a href="/task">My Task</a>
        </li>
      </ul>

      <a href="/" className="navbar__user">
        <i class="fa-solid fa-user">&nbsp;{loginUser.nickname} 님&nbsp;</i>
      </a>

      <button onClick={메뉴보이기} className="navbar__toggleBtn">
        <i class="fa-solid fa-bars"></i>
      </button>
    </nav>
  );
}

export default Main;
