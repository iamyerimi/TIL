## 🐹 상태 관리

"상태 관리"는 React 애플리케이션에서 컴포넌트의 데이터를 관리하는 개념이다. 
React는 단방향 데이터 흐름을 가지고 있기 때문에 컴포넌트의 상태를 효과적으로 관리해야 한다.

React 컴포넌트의 상태는 **컴포넌트 내부에 저장되는 데이터**로, 컴포넌트가 렌더링될 때 사용되고, **상태가 변경되면 컴포넌트가 다시 렌더링**된다. 
상태는 컴포넌트의 동작, UI 상태, 사용자 입력 등 다양한 정보를 저장하는 데 사용된다.

React에서 상태를 관리하기 위해 **useState hook**을 사용할 수 있다. 
useState 훅은 컴포넌트 내부에서 상태 변수를 정의하고, 해당 변수의 초기값을 설정하는 데 사용된다. 이후에 상태 변수를 읽고 변경할 수 있으며, 상태가 변경되면 React는 자동으로 컴포넌트를 다시 렌더링한다.

다음은 상태 관리를 위해 useState 훅을 사용하는 예시이다

```javascript

import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // 초기값 0으로 설정된 상태 변수 count

  const increment = () => {
    // 상태 변수 count를 변경하여 값을 증가시킴
    setCount(count + 1); 
  };

  return (
    <div>
    {/* 상태 변수 count를 출력 */}
      <p>Count: {count}</p> 
	{/* 버튼 클릭 시 increment 함수 호출 */}
      <button onClick={increment}>Increment</button> 
    </div>
  );
}
```
위 예시에서 useState 훅을 사용하여 count라는 상태 변수를 선언하고 초기값을 0으로 설정한다. count 변수는 컴포넌트의 상태를 나타내며, 버튼을 클릭할 때마다 setCount 함수를 호출하여 count 값을 증가시킨다. 변경된 상태는 자동으로 컴포넌트에 반영되어 UI가 업데이트된다.

상태 관리는 React 애플리케이션에서 중요한 개념이며, 복잡한 상태를 효과적으로 관리하여 애플리케이션의 상태 변화에 따라 올바른 UI를 유지하는 데 도움을 준다. 

<br />

## 🐹 글로벌 상태 관리

"글로벌 상태 관리"는 React 애플리케이션에서 **여러 컴포넌트 간에 공유되는 상태를 관리**하는 개념이다. 단일 컴포넌트 내에서 상태를 관리하는 것이 아니라, 여러 컴포넌트 간에 데이터를 공유하고 조작할 수 있도록 한다.

React 컴포넌트는 일반적으로 부모-자식 관계로 구성되어 있으며, 부모 컴포넌트에서 상태를 정의하고 자식 컴포넌트로 전달하는 방식으로 상태를 관리한다. 그러나 규모가 크고 복잡한 애플리케이션에서는 컴포넌트 간의 상태 전달이 번거로울 수 있다. 이런 경우 글로벌 상태 관리를 사용하여 여러 컴포넌트에서 쉽게 상태를 공유하고 업데이트할 수 있다.

글로벌 상태 관리를 구현하기 위해 여러 라이브러리와 패턴이 있다. 그 중 가장 널리 사용되는 라이브러리는 Redux, MobX, React Context API다.

<br />

### ▶️ 1. Redux
Redux는 JavaScript 애플리케이션의 상태 관리를 위한 오픈 소스 라이브러리다. 
주로 React와 함께 사용되며, 애플리케이션의 상태를 효율적으로 관리하고 상태 변화에 따라 컴포넌트를 업데이트하는 작업을 단순화하는 데 도움을 준다.


Redux는 단방향 데이터 흐름 아키텍처인 Flux 아키텍처의 구현체이다. 애플리케이션의 상태를 하나의 **중앙 저장소(Store)에 보관**하고, 상태를 변경하는 데 필요한 **액션(Action)을 디스패치(Dispatch)**하여 상태 변화를 일으킨다. 상태 변화에 따라 미리 정의된 **리듀서(Reducer) **함수가 호출되어 새로운 상태를 생성하고, 이를 다시 Store에 저장한다. 변경된 상태는 구독(subscribe)된 컴포넌트에 자동으로 전달되어 UI를 업데이트한다.


redux를 사용하려면 npm을 사용하여 Redux 패키지를 설치해야 한다.
```javascript
npm install redux
```
이 명령어를 프로젝트의 루트 디렉토리에서 실행하면 Redux 패키지가 설치된다.

<br/>

### ▷ Redux의 주요 개념

`Store`: 애플리케이션의 상태를 저장하는 중앙 저장소이다. 상태는 읽기 전용이며, 상태를 변경하기 위해서는 액션을 디스패치해야 한다.

`Action`: 상태 변경을 위해 발생하는 이벤트 또는 명령을 나타내는 객체. type 필드를 반드시 가져야 하며, 추가적인 데이터를 포함할 수도 있다.

`Reducer`: 상태 변경을 처리하는 순수 함수다. **현재 상태와 액션을 입력으로 받아 새로운 상태를 반환**한다. 여러 개의 리듀서를 조합하여 루트 리듀서를 만들 수 있다.

`Dispatch`: 액션을 발생시키는 메소드로, 액션을 스토어에 전달하여 상태 변경을 일으킨다.

`Subscribe`: 상태의 변화를 감지하여 구독된 컴포넌트에 업데이트를 알려주는 메소드다.

> Redux는 복잡한 애플리케이션에서 상태 관리를 효율적으로 할 수 있으며, 상태 변화에 따른 컴포넌트 간의 데이터 흐름을 명확하게 추적할 수 있다. 
또한 개발자 도구의 지원을 받아 상태 변화를 디버깅하고, 미들웨어를 통해 비동기 작업을 관리하는 등 다양한 확장 기능을 제공한다.

(redux 예시 추가 예정)

<br/>
<br/>

### ▶️ 2. Context API
React Context API는 React 애플리케이션에서 상태를 공유하기 위한 기능을 제공하는 기술이다. 이를 통해 컴포넌트 간에 데이터를 전달하고, 중첩된 컴포넌트 구조에서도 효율적으로 상태를 관리할 수 있다.

<br/>

### ▷ Context API 세 가지 핵심 개념

`Context`: 상태를 공유하기 위한 컨테이너. Context 객체를 생성하고, 해당 객체의 Provider를 통해 상태를 제공하고 구독할 수 있다.

`Provider`: 컨텍스트의 값을 제공하는 컴포넌트. Provider 컴포넌트는 컨텍스트 객체를 사용하여 상태 값을 설정하고, 하위 컴포넌트에 이 값을 전달.

`Consumer`: 컨텍스트 값을 구독하는 컴포넌트. Consumer 컴포넌트는 컨텍스트 객체를 사용하여 상태 값을 읽어와 사용할 수 있다.

**Context API를 사용하면 상위 컴포넌트에서 하위 컴포넌트로 직접적으로 props로 데이터를 전달할 필요가 없다.**
대신, 컨텍스트를 생성하고 Provider를 통해 상태 값을 설정한 후, 하위 컴포넌트에서 Consumer를 사용하여 해당 상태 값을 읽어올 수 있다. 이를 통해 **컴포넌트 간의 계층 구조에 상관없이 상태를 전파**할 수 있다.

<Br/>

### ▷ Context API가 유용하게 사용되는 상황

`전역 상태 관리`: 애플리케이션 전역에서 공유해야 하는 상태를 관리할 수 있다. Redux와 유사한 역할을 수행할 수 있다.

`로컬 상태 전달`: 상위 컴포넌트로부터 여러 단계의 하위 컴포넌트로 데이터를 전달할 때, 중간 단계의 컴포넌트에서 **props를 계속 전달하지 않고** Context API를 사용하여 간편하게 상태를 전달할 수 있다.

`테마, 언어 설정 등의 사용자 환경 설정`: 사용자의 환경 설정과 같은 값들을 컨텍스트로 관리하고, 필요한 컴포넌트에서 해당 설정 값을 사용할 수 있다.

Context API는 React의 일부로 포함되어 있기 때문에 별도의 설치 없이 사용할 수 있다. React.createContext를 사용하여 컨텍스트 객체를 생성하고, 컨텍스트 객체의 Provider와 Consumer를 활용하여 상태를 공유하고 사용할 수 있다.


<Br/>

### ▷ Context API 예시

```javascript
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

```
위의 코드에서는 ThemeContext라는 컨텍스트 객체를 생성하고, ThemeProvider라는 컨텍스트 프로바이더 컴포넌트를 정의한다. 
ThemeProvider 컴포넌트는 theme 상태와 toggleTheme 함수를 제공하고, 하위 컴포넌트에 이 값을 전달한다.

이제 해당 컨텍스트를 사용하는 다른 컴포넌트에서 상태를 읽고 업데이트할 수 있다.


```javascript
// Header.js

// css로 변화를 볼 수 있게 설정함
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


```

```javascript

// App
import { ThemeProvider } from "./contextAPI/ThemeContext";
import Header from "./contextAPI/header";

function App() {
  return (
    <div className="App">
    
    //이렇게 감싸줘야 함.
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </div>
  );
}

export default App;

```
위의 코드에서는 useContext 훅을 사용하여 ThemeContext에서 theme과 toggleTheme 값을 읽어온다. 
이를 통해 헤더 컴포넌트에서는 현재 테마를 반영하고, 테마 전환 버튼을 클릭하여 테마를 변경할 수 있다.

이와 같이 Context API를 사용하면 ThemeProvider 컴포넌트에서 설정한 상태를 다른 컴포넌트에서 손쉽게 사용할 수 있다. Context API는 이 예시와 같이 애플리케이션의 여러 컴포넌트 간에 상태를 공유하고 전파하기 위해 사용될 수 있다.

#### ▷ 예시 실행화면
![](https://velog.velcdn.com/images/iamyerimi/post/b96fa402-97e2-486c-a7be-4cc00ba8e746/image.gif)


<br/>


## 🐹 상태 관리, 글로벌 상태관리 정리

"글로벌 상태 관리"와 "상태 관리"는 개념적인 차이를 가지고 있다.

### 1. **상태 관리(State Management)**

: 상태 관리는 React 애플리케이션에서 컴포넌트 간에 데이터를 전달하고 상태를 관리하는 개념을 일반적으로 의미한다. React에서 상태를 관리하는 방법으로는 **컴포넌트의 상태(State)와 props**를 활용하는 방법이 있다. 상태 관리는 컴포넌트 내에서 상태를 정의하고 업데이트하며, 필요한 데이터를 전달하고 조작하는 과정을 포함한다.

### 2. 글로벌 상태 관리(Global State Management)
: 글로벌 상태 관리는 React 애플리케이션에서 여러 컴포넌트 간에 공유되는 상태를 중앙 집중적으로 관리하는 개념을 의미한다. 이는 단일 컴포넌트의 상태 관리를 넘어 여러 컴포넌트에서 공유되는 데이터를 쉽게 접근하고 업데이트할 수 있도록 해준다. 글로벌 상태 관리를 사용하면 컴포넌트 계층 구조를 따라 상태를 전달하는 번거로움을 피할 수 있으며, 여러 컴포넌트 간의 데이터 공유와 업데이트를 간편하게 할 수 있다.

> 즉, **"상태 관리"**는 **컴포넌트 내에서의 상태 관리**를 의미하고, **"글로벌 상태 관리"**는 **여러 컴포넌트 간의 상태 공유와 업데이트를 중앙 집중적으로 관리**하는 개념을 의미한다. 글로벌 상태 관리를 위해 **Redux, MobX, React Context API**와 같은 라이브러리를 사용할 수 있다.

