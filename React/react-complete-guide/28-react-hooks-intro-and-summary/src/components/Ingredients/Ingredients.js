import React, { useCallback, useEffect, useReducer } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";

// 리듀서 정의: 컴포넌트 밖. 컴포넌트가 렌더링 될 때마다 리듀서 함수가 다시 생성되지 않게.
// reducer를 useState 대신 사용했기 때문에 주석처리된 useState가 밑에 꽤 많다!
const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter((ing) => ing.id !== action.id);
    default:
      throw new Error("Should not get there! ");
  }
};

const Ingredients = () => {
  // useReducer로 상태를 초기화함.
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const {isLoading, error, data, sendRequest} = useHttp();

  // const [userIngredients, setUserIngredients] = useState([]);


  //로딩 스피너 만들기
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  // Search 컴포넌트에서 이미 ingredients를 fetching하고 있으니깐 삭제고
  // useEffect(() => {
  //   fetch(
  //     "https://react-hooks-update-2e63e-default-rtdb.firebaseio.com/ingredients.json"
  //   )
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       const loadedIngredients = [];
  //       for (const key in responseData) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount,
  //         });
  //       }
  //       setUserIngredients(loadedIngredients);
  //     });
  // }, []);

  useEffect(() => {
    console.log("RENDERING INGREDIENTS", userIngredients);
  });

  // 검색핸들러
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    // setUserIngredients(filteredIngredients);
    // dispatch로 userIngredients를 업데이트 하도록 변경
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  const addIngredientHandler = (ingredient) => {
    // setIsLoading(true);
    dispatchHttp({ type: "SEND" });
    fetch(
      "https://react-hooks-update-2e63e-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST", //POST 방식 지정
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        // setIsLoading(false);
        dispatchHttp({ type: "RESPONSE" });
        return response.json();
      })
      .then((responseData) => {
        // 첫번째 then에서 본문을 가져온 뒤 실행되는 두 번째 .then()
        // 응답 데이터 처리
        console.log(ingredient);
        // then에 넘겨준 함수는 요청이 완료된 뒤에 실행됨. 따라서 요청 완료 후 재료 목록 업데이트함.

        // setUserIngredients((prevIngredients) => [
        //   { id: responseData.name, ...ingredient }, // responseData.name: firebase에서 자동으로 생성한 id.
        //   ...prevIngredients,
        // ]);

        dispatch({
          type: "ADD",
          ingredient: { id: responseData.name, ...ingredient },
        });
      });
  };
  // ingredient 삭제
  const removeIngredientHandler = (ingredientId) => {
    // setIsLoading(true);
    // dispatchHttp({ type: "SEND" });
    sendRequest(`https://react-hooks-update-2e63e-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`, 'DELETE')
    
  };

  // 에러 처리
  const clearError = () => {
    // setError(null);
    dispatchHttp({ type: "CLEAR" });
  };
  return (
    <div className="App">
      {error && (
        <ErrorModal onClose={clearError}>{error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
