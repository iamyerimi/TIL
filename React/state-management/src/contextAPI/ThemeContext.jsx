// ThemeContext.js

import React, { createContext, useState } from 'react';

// 컨텍스트 객체 생성
const ThemeContext = createContext();

// 컨텍스트 프로바이더 컴포넌트
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Provider를 통해 값을 제공
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
