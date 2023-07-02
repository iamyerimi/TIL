// Header.js

import "./header.css";
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const Header = () => {
  // 컨텍스트 값을 읽어옴
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={theme === "light" ? "light-theme" : "dark-theme"}>
      <h1>My App</h1>
      <h2>{theme === "light" ? "light-theme" : "dark-theme"}</h2>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </header>
  );
};

export default Header;
