import { useCallback, useReducer } from "react";

// http에 대해 useReducer() 사용하기
const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    //action일어날 때: 요청 전송할 떄, 응답이 도착했을 때, 에러 났을 때.
    //리듀서가 알아서 요청까지 보내는 건 아님. 여기서는 요청 전송과 관련있고, UI에 영향을 주는 state만 관리함.
    case "SEND":
      return { loading: true, error: null, data: null };
    case "RESPONSE":
      return { ...curHttpState, loading: false, data: action.responseData }; //기존 state에서 누락되는 값 없이 같은 이름의 프로퍼티값 덮어쓰게 함.
    // 새로운 값을 넣지 않은 프로퍼티들은 새로운 객체에서도 기존 값 유지.

    case "ERROR":
      return { loading: false, error: action.errorMessage };
    case "CLEAR":
      return { ...curHttpState, error: null };
    default:
      throw new Error("Should not be reached!");
  }
};

const useHttp = () => {
  //state를 관리할 때 사용하는 이름과 초기화할 때 사용하는 이름은 일치해야 한다 = 필드 이름은 일치해야 한다.
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
    data: null,
  });

  const sendRequest = useCallback((url, method, body) => {
    dispatchHttp({ type: "SEND" });
    fetch(url, {
      method: method,
      body: body,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.json();
        // setIsLoading(false);
        // dispatchHttp({ type: "RESPONSE" });
        // console.log(ingredientId); //이게 선택한 id값
        // setUserIngredients((prevIngredients) =>
        // prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
        // );
        // dispatch({ type: "DELETE", id: ingredientId });
      })
      .then((responseData) => {
        dispatchHttp({ type: "RESPONSE", responseData: responseData });
      })
      .catch((error) => {
        // fetch는 promise를 반환하기 때문에 에러 처리는 catch()에서...

        dispatchHttp({ type: "ERROR", errorMessage: error.message });
        // setError(error.message); //모든 Error객체에는 message 프로퍼티가 있음.
        // setError("Something went wrong!!")
        // setIsLoading(false);

        //위의 두 state가 동시에 업데이트되고 렌더링 됨. 각각 따로 되는 게 아님!
      });
  }, []);
  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
  };
};

export default useHttp;
