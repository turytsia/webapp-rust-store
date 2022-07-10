import { Link } from "react-router-dom";
import { useState } from "react";

import "./styles/header.css";

import HeaderNavigation from "./HeaderNavigation";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
  const [isMenuActive, setMenuActive] = useState(false);

  const onMenuActiveHandler = (e) => {
    setMenuActive((prevState) => !prevState);
  };

  return (
    <header className="header">
      <HeaderMenu onClose={onMenuActiveHandler} isActive = {isMenuActive} />
      <div className="header__content">
        <h2 className="header-logo">
          <Link to="/">
            <img
              src="https://i.pinimg.com/originals/cc/40/6a/cc406a8382d8df7eb5f395ec884d3c95.png"
              alt="logo"
            />
            <span>RUSTBOOST</span>
          </Link>
        </h2>
      </div>
      <div className="header__content">
        <nav className="header-navigation">
          <HeaderNavigation />
        </nav>
      </div>
      <div className="header__bars">
        <button onClick={onMenuActiveHandler}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </header>
  );
}
