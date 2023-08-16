## ▷ Vite란?

Vite는 빠른 개발 속도와 간편한 설정을 제공하는 웹 개발 도구. 
TypeScript(TS)와 함께 사용할 때도 편리한 기능을 제공. 
프랑스어라서 '비트'라고 읽는다. '바이트'가 아니란다.

<br/>

## ▷ Vite와 Create React App의 차이점

1. `빌드 시스템`: Create React App은 Webpack을 사용하여 빌드하고, Vite는 ESBuild를 사용하여 빌드한다. 
ESBuild는 빌드 속도가 매우 빠르고 결과물의 크기가 작다.

2. `개발 서버`: Create React App은 HMR(Hot Module Replacement)을 사용하여 개발 서버를 제공하지만, Vite는 ES Modules 기반의 HMR을 사용하여 더 빠른 개발 속도를 제공한다.

3. `프로젝트 구성`: Vite는 간단한 구성을 지원하며 개발자가 선호하는 방식으로 프로젝트를 구성할 수 있다. 
Create React App은 미리 구성된 프리셋을 제공하여 빠른 시작을 지원합니다.

### Vite 사용법
1. 환경 변수 설정
```
# .env 파일
VITE_APP_NAME=My App
```
```
// .env 파일 사용
console.log(import.meta.env.VITE_APP_NAME);
```

2. 환경 변수를 사용한 API URL 설정
```
# .env 파일
VITE_API_URL=http://api.example.com
```
```
// .env 파일 사용
const apiUrl = import.meta.env.VITE_API_URL;
fetch(apiUrl);
```

3. 프로젝트 루트 디렉토리에서 절대경로 사용
```
import MyComponent from '@/components/MyComponent';
```


<br/>

## ▷ TypeScript와 함께 Vite 사용하기

- Vite는 기본적으로 TypeScript를 지원하며, 프로젝트 생성 시 TypeScript 템플릿을 선택할 수 있다.
- TypeScript를 사용하려면 .tsx 확장자로 파일을 작성하고, tsconfig.json 파일을 프로젝트 루트에 추가하여 TypeScript 설정을 구성해야 한다.
- Vite는 TypeScript의 타입 체크와 함께 빠른 빌드 속도를 제공하며, 기존 JavaScript 프로젝트를 쉽게 TypeScript로 마이그레이션할 수 있다.

1. Vite와 Typescript 설치
```
npm init vite@latest 프로젝트명 --template react-ts
```

2. 프로젝트 생성 후 필요한 종속성 설치
```
cd 프로젝트명
npm install
```

3. 개발 서버 실행
```
npm run dev
```

- 위의 과정을 따르면 my-app이라는 디렉토리에 Vite 및 TypeScript를 사용한 React 프로젝트가 생성됨.

- 프로젝트가 생성된 후에는 src 디렉토리 안에서 TypeScript로 작성된 파일(.tsx 확장자)을 생성하고 수정할 수 있다. 

<br/>

## ▷ Vite의 장점

1. `빠른 개발 속도`: ESBuild와 HMR을 사용하여 개발 속도를 크게 향상시킨다. 모듈 단위로 빌드 및 리로드되어 변경 사항을 빠르게 확인할 수 있다.

2. `작은 번들 크기`: ESBuild의 빌드 시스템을 사용하므로 번들 크기가 작고 실행 속도가 빠르다.

3. `최소한의 설정`: Vite는 간단한 설정으로 프로젝트를 시작할 수 있으며, 초기 구성이 더욱 간단하고 직관적이다.

4. `선별적 번들링`: Vite는 코드를 모듈 단위로 번들링하기 때문에 사용하지 않는 코드는 번들에 포함되지 않아 더 작은 번들 크기를 유지할 수 있다.

<br/>

## ▷ 추가 정보

- Vite는 다양한 프레임워크와 라이브러리를 지원한다. React, Vue, Preact, Svelte 등 다양한 프레임워크에서 사용할 수 있다.

- Vite는 기본적으로 ES Modules를 사용하여 모듈 시스템을 지원한다. 이는 더욱 최신 JavaScript 문법과 기능을 활용할 수 있음을 의미한다.

- Vite는 다양한 플러그인을 제공하여 프로젝트의 기능을 확장할 수 있다. 플러그인을 사용하여 CSS 전처리기, 코드 스플리팅, 테스트 등 다양한 기능을 추가할 수 있다.

- Vite는 빠른 개발 속도, 작은 번들 크기, 유연한 구성 등을 통해 프론트엔드 개발 경험을 향상시키는 도구다. 

- TypeScript와 함께 사용하면 정적 타입 체크와 개발 생산성을 함께 높일 수 있다. 

## Parsing error가 난다면
> "Parsing error: ESLint was configured to run on `<tsconfigRootDir>/vite.config.ts` using `parserOptions.project`

위와 같은 에러가 난다면, 
```
npm run lint
npm run dev
```
위의 코드대로 실행.

- 에러가 없어진 이유: npm run lint 명령을 실행하면 ESLint가 프로젝트 파일을 검사하고 코드 스타일 및 잠재적인 오류를 확인하기 때문이다. 이 과정에서 .eslintrc.cjs 파일의 설정이 올바르게 적용되고 오류가 수정되었을 수 있다고 한다.

### Vite 프로젝트에서 HMR 설정하기

1. 플러그인 설치
```
cd 프로젝트명
npm install --save-dev @vitejs/plugin-react-refresh
```

2. vite.config.js 수정
```javascript
// vite.config.js

const reactRefresh = require('@vitejs/plugin-react-refresh');

module.exports = {
  plugins: [reactRefresh()]
};
```

나 같은 경우는 
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig({
  plugins: [react(), reactRefresh()]
})
```
- 이렇게 배열에 추가해줌.


3. 개발 서버 실행
```
npm run dev
```

이렇제 하면 React 컴포넌트를 수정할 때마다 변경 사항이 실시간으로 반영된다.

### Vite 더 알아보기
> [Vite 공식 문서 바로가기](https://ko.vitejs.dev/guide/)