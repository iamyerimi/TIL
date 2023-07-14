import React, { useEffect, useRef, useState } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props; // 객체 구조 분해 할당. {객체에 있는 key이름 명시} = 구조 분해or프로퍼티 가져올 객체
  // 해당 키를 객체에서 꺼내 onLoadIngredients라는 상수에 저장함(상수로 분리됨).
  // 이제 onLoadIngredients로 호출될 수 있고, onLoadIngredients를 의존성으로 지정할 수 있음
  const [enteredFilter, setEnteredFilter] = useState(""); // 배열 구조 분해 할당
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      //아래의 enteredFilter는 500밀리초 전에 입력된 값.(현재 입력된 값 X), useEffect가 실행된 시점.
      if (enteredFilter === inputRef.current.value) {
        //current는 ref객체가 가진 프로퍼티임.(여기서는 input을 의미)
        // inputRef.current.value는 inputRef가 클로저 바깥에 정의되어 있기 때문에 현재 input요소의 value값이다.

        // firebase의 filter 쓰기: 매개변수 query 붙이기.(=> query변수 만들어서 저장 후 url뒤에 붙임)
        const query =
          enteredFilter.length === 0
            ? ""
            : `?orderBy="title"&equalTo="${enteredFilter}"`;
        fetch(
          "https://react-hooks-update-2e63e-default-rtdb.firebaseio.com/ingredients.json" +
            query
        )
          .then((response) => response.json())
          .then((responseData) => {
            const loadedIngredients = [];
            for (const key in responseData) {
              loadedIngredients.push({
                id: key,
                title: responseData[key].title,
                amount: responseData[key].amount,
              });
            }
            onLoadIngredients(loadedIngredients);
          });
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    }; // clean up 함수(다음이펙트 실행 전 동작). useEffect함수가 다시 실행되기 직전에 실행됨. 여기에서 이전 타이머를 지울거임.
  }, [enteredFilter, onLoadIngredients, inputRef]);
  // inputRef도 이펙트 안에서 쓰고 있기 때문에 의존성 값이다.
  // 다른 값이나 props가 변경되어도 실행되지 않고, enteredFilter가 변경되거나 onLoadIngredients함수가 변경될 때만 실행.(그 때만 요청을 전송하도록 코드짬)
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
