## useEffect란?

- useEffect는 React의 훅(hook) 중 하나로, **컴포넌트의 생명주기에 따라 특정 작업을 수행하도록 설정**하는 역할을 한다.
- useEffect를 사용하여 컴포넌트가 **렌더링된 후**에 실행되는 부수적인 효과(이펙트)를 관리할 수 있다.
- 콜백 함수를 특정 시점에 호출하여 작업을 수행하고, 필요에 따라 정리(clean-up) 함수를 반환할 수 있다.

### 사용법
```javascript 
useEffect(()=>{}, [])
```
- useEffect 함수는 두 개의 인자를 받는다: `콜백 함수`와 `의존성 배열(dependency array)`.

#### 첫 번째 인자: 콜백 함수

- 콜백 함수는 컴포넌트가 <u>마운트</u>될 때, <u>업데이트</u>될 때, <u>언마운트</u>될 때 등 다양한 시점에서 호출된다.
- 부수적인 작업을 수행할 수 있다. ex) API 호출, 이벤트 리스너 등을 설정하거나 해제하는 등의 작업을 수행할 수 있다.
- 콜백 함수에서 반환하는 값은 정리(clean-up) 함수로 사용될 수 있으며, 컴포넌트가 언마운트되거나 다음 업데이트가 이루어지기 전에 호출된다.

#### 두 번째 인자: 의존성 배열
- 의존성 배열(dependency array)에 포함된 값들이 변경될 때에만 콜백 함수가 호출되도록 조건을 설정할 수 있다. 
- 의존성 배열을 생략하면 컴포넌트가 렌더링될 때마다 콜백 함수가 호출된다.
- 빈 배열([])로 설정하면 컴포넌트가 마운트될 때에만 콜백 함수가 호출되고, 언마운트될 때에는 정리(clean-up) 함수가 호출된다.


### 장점

- **컴포넌트의 생명주기를 훅으로 관리**하므로 클래스 컴포넌트의 복잡한 생명주기 메서드를 대체할 수 있다.
- 코드의 가독성과 유지보수성이 향상된다.
- 비동기 작업, 데이터 가져오기, 이벤트 처리 등 부수적인 작업을 간편하게 관리할 수 있다.
- 의존성 배열을 사용하여 효율적으로 작업을 제어하고 불필요한 업데이트를 방지할 수 있다.


### 유의사항

#### 1. 의존성 배열 관리
- useEffect는 의존성 배열(dependency array)을 인자로 받는다. 

- 의존성 배열은 useEffect가 실행되는 조건을 결정한다. 

- 이 배열에 포함된 값들 중 하나라도 변경되었을 때에만 useEffect가 실행된다. 

- 의존성 배열을 지정하지 않으면 매 렌더링 시에 useEffect가 실행된다. 
올바른 의존성 배열을 설정하여 필요한 시점에만 useEffect가 실행되도록 해야 한다.

#### 2. 무한 루프 방지
- useEffect 내부에서 상태(state)를 변경하면 컴포넌트가 다시 렌더링되고 useEffect가 다시 실행된다. 
이렇게 되면 무한한 루프가 발생할 수 있다. 

- 따라서 useEffect 내부에서 상태를 변경할 때는 주의해야 한다. 
상태를 변경해야 하는 경우, 의존성 배열을 적절히 설정하여 불필요한 렌더링과 useEffect 실행을 방지해야 한다.

#### 3. 정리(clean-up) 함수
- useEffect는 부수 효과를 관리하기 위해 사용되는데, 이때 정리(clean-up) 함수를 활용할 수 있다. 

- useEffect 내부에서 반환하는 정리 함수는 컴포넌트가 **언마운트되거나 업데이트되기 직전에 실행**된다. 

- 이를 통해 리소스 해제, 이벤트 리스너 제거 등의 작업을 수행할 수 있다. 
정리 함수가 필요하지 않은 경우에는 빈 함수로 반환하거나 반환을 생략할 수 있다.

#### 4. useEffect 사용 시 주의사항
- useEffect 내부에서 비동기 작업을 수행하는 경우, 컴포넌트가 언마운트되었을 때 해당 작업이 완료되지 않았다면 문제가 발생할 수 있다. 
이를 방지하기 위해 useEffect 내부에서 비동기 작업을 수행할 때 취소나 정리 작업을 진행해야 한다. 

- 예를 들어 useEffect 내부에서 axios를 사용하여 API 요청을 보내는 경우, 해당 요청을 취소하는 방법을 알고 있어야 한다.

위의 유의사항을 염두에 두고 useEffect를 사용하면 좀 더 안정적이고 예상 가능한 동작을 갖는 컴포넌트를 개발할 수 있다!