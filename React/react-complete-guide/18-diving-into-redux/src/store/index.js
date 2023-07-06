// 리덕스 로직 저장소

import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      //여기서 상태 변경
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

const initialAuthState = { isAuthenticated: false };
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    // 리덕스에서 자동으로 제공하는 현재 상태를 인자로 받음(state로 받)
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

// slice가 여러개라도 store는 하나. 그래서 configureStore는 한 번만 호출.
// store는 오직 한 개의 reducer를 가지고 있음.
const store = configureStore({
  // 이 reducer는 reducer함수를 인자로 받을 뿐만 아니라
  //리듀서맵 역할을 하는 객체로서 받기도 한다. 아래처럼.
  // 이 개별 reducer들은 나중에 하나로 자동으로 합쳐진다.
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;
