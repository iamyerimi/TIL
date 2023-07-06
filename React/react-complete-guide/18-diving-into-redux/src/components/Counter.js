import classes from "./Counter.module.css";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/index"; 

const Counter = () => {
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);
  // useSelector를 호출하고 함수를 넣어줘야 함. 그 함수는 react-redux가 실행해줄 것임. useSelector가 저장소에어 추출하려는 데이터 부분을 결정할 것임. 지금은 카운터밖에 없지만, 규모가 커지만 더 복잡해짐 상태객체가 . 그래서 그 중 필요한 부분을 잘라내서 쓰는 것은 중요함.
  // redux가 관리하는 상태 부분을 받고(state), 우리가 추출하려는 상태 부분(state.counter)을 리턴할 것임.
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch(counterActions.increment()); // 새로운 action 보냄.
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement()); // 새로운 action 보냄.
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(10));
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 10</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
