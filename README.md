# Framer Motion 라이브러리를 활용한 애니메이션 효과 연습 프로젝트
framer motion 라이브러리의 초기 세팅과 HTML 태그 사용 방법, property, 주의사항 등을 정리한 문서<br />
사용 목적 : 컴포넌트에게 애니메이션 효과를 효율적으로 부여하기 위해 사용
<br />
<br />
<br />
<br />
## 1. 초기 세팅
라이브러리 설치 : npm i framer motion
<br />
<br />
## 2. 사용 방법
### 2-1. 기본 문법
예시 : <Component initial={} animate={} />
Component 컴포넌트에 초기값(initial)과 애니메이션 효과(animate) props 전달

### 2-2. variants 객체를 통한 animate 구현
variants는 컴포넌트에게 props를 통해 객체를 전달하여 클린 코드를 작성할 수 있게 한다<br />
컴포넌트가 무대에 오를 때의 모습(initial), 무대에서 시연할 동작들(animate)을 모아둔 객체와 같다<br />
(애니메이션으로 작성할 동작들을 variants 객체로 만들어서 관리 후 요소에 props로 전달하는 방식)
<br />
```
 // 컴포넌트에 props를 통해 전달할 객체명(사용자가 임의로 명명 가능)
const myVars = {
 // 컴포넌트에 props로 전달할 객체의 키값(사용자가 임의로 명명 가능), 여기서는 initial에 전달하고자 함
start: { scale: 0 },
// 컴포넌트에 props로 전달할 객체의 키값(사용자가 임의로 명명 가능), 여기서는 animate에 전달하고자 함
end: { scale: 1, rotateZ: 360, transition: { type: "spring" } },
};

```
예시 : <Box variants={myVars} initial="start" animate="end" />

### 2-3. 부모와 자식 관계
부모 컴포넌트에 variants 객체를 전달할 때 키 값을 start, end라고 작성했다고 가정할 때,
자식 컴포넌트에 전달할 variants 객체의 키 값도 부모와 동일하게 작성하면 키 값은 동일하더라도 각각 전달받은 variants 객체의 이름에 따라 서로 다르게 작동한다<br />
그래서 부모와 자식 variants 객체 키 값을 동일하게 작성하고 variants 객체명을 다르게 할 수 있다
<br />
```
const ParentsVariants = {
start : { scale : 0 },
end : { scale : 1 },
};

const ChildernVariants = {
start : { rotateZ : 360 },
end : { rotateZ : 0 },
};

<Parents variants={ParentsVariants} initial="start" animate="end">
   <Children variants={ChildernVariants} initial="start" animate="end" />
<Parents />
```

### 2-4. 이벤트리스너 감지
hover, click, tab 등 이벤트리스너 감지 후 애니메이션 부여가 가능하다<br />
컴포넌트에 whilexxx props 전달
prop 목록 : `whileInView`, `whileHover`, `whileTap`, `whileFocus`, `whileDrag`

### 2-5. HTML 태그 사용
styled-components 라이브러리와 결합해서 사용하려고 하니 일반 HTML 태그에는 애니메이션 효과 적용이 불가능했다<br />
그래서 motion import 후 Motion 내 HTML 태그 호출을 통해 해결할 수 있었다.

<예시>
const div = styled.div\``; <<< ❌<br />
const div = styled.(Motion.div)\``; <<< ⭕

### 2-6. transition 타입
애니메이션을 구현해보면 spring 애니메이션이 기본적으로 설정돼있다(spring 애니메이션이 default값)<br />
\* spring 타입 : 애니메이션이 끝나고 팅기는 듯한 느낌의 애니메이션<br />
만약 깔끔하게 끝내고 싶으면 transition porps에서 type을 tween으로 지정해주면됨
transition 타입 종류 : `spring`, `tween`

## 2-7. 조건부 렌더링 애니메이션 적용 방법
ReactJS 조건부 렌더링 때 애니메이션 적용하는 방법
<AnimatePresence> 컴포넌트로 조건부 렌더링 문장 감싸주고 조건부로 보여줄 컴포넌트에 variants props 전달 // initial, animate, exit << 이게 추가됨

svg파일 스타일 설정
fill 채우기
stroke 외형 선 색상
strokeWidth 외형 선 두께



exitBeforeEnter 옵션 : animatepresence 컴포넌트를 사용하면 animate, exit 애니메이션이 동시에 실행되는데 만약 exit 애니메이션 종료 후 animatie 애니메이션이 실행되길 원하면 exitBeforeEnter 옵션을 주면 구현 가능함

layoutID를 통한 컴포넌트간 애니메이션 생성
<circle>라는 컴포넌트가 있다고 가정할 때
각각의 circle 컴포넌트는 엄밀히 말하면 다른 컴포넌트이지만 layoutID를 동일하게 부여해서 연결이 가능하다
연결 후에는 애니메이션 생성도 해서 훨씬 부드러운 효과를 연출함

참고 문서 : https://motion.dev/docs/react-motion-component
