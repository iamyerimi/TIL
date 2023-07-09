## 📌 fetch API는?
React에서 fetch API는 네트워크 요청을 처리하기 위해 사용된다. 

<Br/>

## 📌 사용 상황
1. `데이터 가져오기`: 서버로부터 데이터를 가져와 컴포넌트에 표시해야 할 때 fetch API를 사용할 수 있다. 예를 들어, 영화 목록을 가져와 화면에 표시하거나 블로그 게시물을 가져와 목록으로 표시할 때 사용할 수 있다.

2. `데이터 전송`: 사용자의 입력을 서버로 전송해야 할 때 fetch API를 사용할 수 있다. 예를 들어, 사용자가 양식을 작성하고 제출할 때 입력된 데이터를 서버로 전송할 수 있다.

3. `RESTful API 호출`: RESTful API와 상호 작용해야 할 때 fetch API를 사용할 수 있다. 서버로부터 리소스를 가져오거나 업데이트하거나 삭제할 때 사용할 수 있다.

> - fetch API는 비동기적으로 동작하며, Promise를 반환한다. 
- 따라서 `.then()` 또는 `async/await`와 함께 사용하여 요청을 처리하고 응답 데이터를 다룰 수 있다.


<Br/>

## 📌 사용 방법

### 1. 기본적인 GET 요청
```javascript
fetch(url)
  .then(response => response.json())
  .then(data => {
    // 데이터 처리
  })
  .catch(error => {
    // 에러 처리
  });
```
위의 코드는 주어진 url로 GET 요청을 보내고, 응답 데이터를 JSON 형식으로 파싱하여 처리하는 기본적인 방법이다. 
`.then()` 메서드를 사용하여 응답을 처리하고, `.catch()` 메서드를 사용하여 에러를 처리할 수 있다.

<Br/>

### 2. POST 요청

```javascript
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(data => {
    // 응답 데이터 처리
  })
  .catch(error => {
    // 에러 처리
  });
```
위의 코드는 주어진 url로 POST 요청을 보내는 방법이다. 
`method: 'POST'`로 설정하고, `headers`를 사용하여 요청 헤더를 설정하고, `body`에 요청 데이터를 JSON 형식으로 변환하여 전송한다.


<Br/>

### 3. Async/Await 사용

```javascript
try {
  const response = await fetch(url);
  const data = await response.json();
  // 데이터 처리
} catch (error) {
  // 에러 처리
}
```
위의 코드는 `async/await` 구문을 사용하여 비동기적인 요청을 처리하는 방법이다. 
`await` 키워드를 사용하여 비동기 함수 호출을 기다리고, `try/catch` 블록을 사용하여 에러를 처리한다.

<Br/>

#### 4. 추가적인 설정
fetch API는 다양한 옵션을 제공하여 요청을 추가로 설정할 수 있다. 
예를 들어, 요청 헤더를 설정하거나 쿠키를 포함시킬 수 있다. 
자세한 내용은 <u>[MDN 문서를 참조](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API)</u>하자.


<Br/>

<Br/>
