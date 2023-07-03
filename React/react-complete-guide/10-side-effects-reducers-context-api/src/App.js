import React, { useEffect, useState } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 1. 로컬 스토리지에서 로그인 정보 가져오고

  // 2. 로그인 정보 조건 확인 후 setLoggedIn으로 로그인했다고 설정함.
  // 이러면 loginHandler함수가 실행되지 않고도 사용자를 loggedIn으로 설정.
  // 3. 하지만 요래 만들면 무한 루프가 만들어질 수도 있따.
  // -> 그래서~~ useEffect를 사용해야 한다. 언제 실행될 지 제어하려고.

  // 요렇게 하면
  useEffect(() => {
  const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    // 이 함수는 컴포넌트에서 실행되는 것이 아닌 리액트에 의해 실행됨.
    // 모든 컴포넌트 재평가 이후에 실행됨. 즉, 컴포넌트 함수가 실행된 '후에' 실행된다는 것임.

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []); // [] 여기서 의존성이 변경된 경우에만 실행됨. 빈칸으로 두면 앱이 시작할 떄 한 번만 실행됨.

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
