redux toolkit을 사용하려면
`npm install @reduxjs/tooklit`를 터미널에 입력한다.
그리고 전에 설치했던 리덕스 라이브러리는 삭제해야 한다.
redux toolkit에 이미 들어있기 때문이다.
package.json에서 삭제해주면 된다 :)


## createSlice
: createSlice 함수는 Redux 상태 관리를 간소화하고 보일러플레이트 코드를 줄여주는 역할을 한다.

createSlice 함수를 사용하여 리듀서(reducer)와 액션 생성자(action creator)를 한 번에 생성할 수 있다. 이를 통해 Redux 상태의 초기값과 상태 갱신에 필요한 액션 타입과 액션 생성자 함수를 간단하게 정의할 수 있다.

createSlice 함수에는 다음과 같은 속성을 전달해야 한다:
`name`: 슬라이스의 이름으로, 리듀서와 액션 생성자의 이름에 사용.
`initialState`: 슬라이스의 초기 상태를 정의.
`reducers`: 액션과 상태를 관리하는 메서드를 정의하는 객체.

createSlice 함수를 호출하면 리듀서와 액션 생성자를 포함한 슬라이스 객체가 반환된다. **슬라이스 객체는 reducer 속성과 정의한 각 액션에 대한 액션 생성자 메서드를 가지고 있다.**

이렇게 생성된 슬라이스 객체를 Redux 스토어에 등록하면 해당 슬라이스의 상태와 액션들을 관리할 수 있다. 슬라이스의 액션 생성자 메서드를 호출하면 해당 액션을 디스패치(dispatch)할 수 있으며, 리듀서는 액션에 따라 상태를 업데이트한다.

이러한 방식으로 createSlice 함수는 Redux 개발 과정을 간소화하고, 보일러플레이트 코드를 줄여주어 코드의 가독성과 유지보수성을 향상시켜준다.

아래는 Counter를 만드는 예시 코드이다.

* src/store/index.js
```javascript
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      //여기서 상태 변경
      state.counter++; // 어, 이거 안된다며! 아래 설명.
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload; // 인자로서 실행하고자 하는 액션 메서드에 전달한 값을 추가 필드명이 payload인 곳에 저장함. payload라는 필드명은 내가 정할 수 있는 게 아니다.
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
```

직접 state를 변화시키면 안된다고 했었는데?!
: 직접 변화시키는 것처럼 보일 뿐이다. 여전히 원래 있는 상태는 절대 변경할 수 없다.

Redux toolkit createSlice와 같은 함수를 사용하면 기존 상태를 바꿀 수 없다!

왜냐하면 Redux toolkit는 내부적으로 immer라는 다른 패키지를 사용하는데, 이런 코드를 감지하고 자동으로 원래 있는 상태를 복제한다.
그리고 새로운 상태 객체를 생성하고 모든 상태를 변경할 수 없게 유지하고, 저희가 변경한 상태는 변하지 않도록 오버라이드한다.
저기에는 여전히 변경할 수 없는 코드가 있다~~~ 나에게 보이지 않을 뿐.

redux toolkit 덕분에 굳이 직접 코드를 복사할 필요도, 불변성을 신경 쓸 필요도 없어진다.
이제 상태를 직접 변경할 수 있게 된다.
내부적으로 알아서 변경할 수 없는 코드로 변환하니까~~~

redux toolkit을 만나고 나의 성공시대 시작됐다~~


위에 설명했듯이 createSlice는 서로 다른 리듀서에 해당하는 고유 액션 식별자를 자동으로 생성한다.

액션 식별자 값을 얻으려면 counterSlice.actions를 사용하면 된다.

그리고 payload에 대한 설명은 코드 안에 주석으로 달아놓았다.


```javascript
export const counterActions = counterSlice.actions;
```
위와 같이 내보내고, 액션이 필요한 컴포넌트로 가서 import후 사용하면 된다.


* Counter.js
: 여기서 아까 src/store/index.js에서 내보냈던 counterActions를 import한 후, dispatch로 counterActions에 접근해 실행하면 된다.
counterActions가 리듀서 메소드들을 key로 가진 객체니깐유.

어휴.. 그냥 코드로 해보겠다.

```javascript
  const incrementHandler = () => {
    dispatch({ type: "increment" }); // 새로운 action 보냄.
  };
```
위의 코드는 redux toolkit 사용전...


```javascript
  const incrementHandler = () => {
    dispatch(counterActions.increment()); 
  };

 const increaseHandler = () => {
    dispatch(counterActions.increase(10)); 
   // 10씩 증가하게~ 냅다 10을 넣으면 위서 payload로 받음
  };

```
위는 redux toolkit을 사용해서 increment를 냅다 메소드로 실행한다.
왜냐하면 increment는 고유 액션 식별자가 자동으로 생성하게 설정된 전체 액션 객체를 만드는 방법이기 때문이다.
그래서 여기에 전체 액션 객체가 자동으로 생성되는 거다.



## configureStore
: configureStore는 createStore처럼 store를 만든다. 다른 점은 여러 개의 리듀서를 하나의 리듀서로 쉽게 합칠 수 있다는 거다.

```javascript
const store = configureStore({
  reducer: counterSlice.reducer,
});

export const counterActions = counterSlice.actions;
export default store;
```
위의 코드에서 configureStore 함수는 reducer 옵션을 사용하여 스토어의 리듀서를 설정한다. 
counterSlice.reducer를 전달하여 counterSlice에서 생성된 리듀서 함수를 사용한다. 
이렇게 설정된 리듀서는 스토어에 의해 호출되어 상태 업데이트가 이루어진다.

지금은 상태slice가 하나라 이렇게 썼지만, 
규모가 큰 애플리케이션이라서 상태 slice가 여러 개라면 이 리듀서 key 값 대신에 객체를 설정해서 그 객체 안에 원하는 대로 속성 이름을 정하고(key 값을 설정), 그 프로퍼티들의 값이 또 다른 리듀서 함수가 되는 것이다.

결국 리듀서 맵을 생성하는 거다.


요래요래해서 redux toolkit을 이용한 카운터를 만들었다네..
