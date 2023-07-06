// 리덕스 로직 저장소
import counterReducer from "./counter";
import authReducer from "./auth";
import { configureStore } from "@reduxjs/toolkit";

// slice가 여러개라도 store는 하나. 그래서 configureStore는 한 번만 호출.
// store는 오직 한 개의 reducer를 가지고 있음.
const store = configureStore({
  // 이 reducer는 reducer함수를 인자로 받을 뿐만 아니라
  //리듀서맵 역할을 하는 객체로서 받기도 한다. 아래처럼.
  // 이 개별 reducer들은 나중에 하나로 자동으로 합쳐진다.
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;
