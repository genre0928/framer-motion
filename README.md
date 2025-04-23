# Framer Motion ReactJS 라이브러리를 활용한 애니메이션 효과 연습용 프로젝트트

1. 초기 세팅
   -- 라이브러리 설치 npm i framer motion

2. variants - 애니메이션의 무대(코드를 깔끔하게 해줌줌)
   > > 애니메이션으로 작성할 동작들을 variants 객체로 만들어서 관리 후 요소에 props로 전달하는 방식임
   > > const myVars = {
   > > start: { scale: 0 },
   > > end: { scale: 1, rotateZ: 360, transition: { type: "spring" } },
   > > };

<Box variants={myVars} initial="start" animate="end" />

부모와 자식 관계
-- 부모의 initial과 animate의 props 이름을 자식에게도 자동으로 넘겨줌
그래서 부모와 자식에 동일한 객체 내 키값으로 지정해주고 variants를 다른 이름으로 해주면 오버로딩처럼 다형성을 가지고 쓸 수 있음

이벤트리스너 감지(hover, tab 등)
컴포넌트에 whilexxx props 전달달

1. 연습내용 --- 작성 예정

\*\* 주의사항
div 같은 기존 HTML 태그는 framer-motion 작동하지 않음

> > 해결방법
> > import {module} from 'framer-motion' 후 motion.tag 이런 식으로 생성해야함

styled-components 라이브러리와 framer-motion을 결합해서 사용하려면 styled(motion.tag) << 이런 식으로 해주면됨

모든 애니메이션엔 spring 기능이 default값임
(애니메이션이 끝나고 팅기는 듯한 느낌)

만약 이거 없이 깔끔하게 끝내고 싶으면 transition porps에서 type을 tween으로 지정해주면됨(아마 tween 아니고도 다른 것도 가능할듯? - 이건 더 공부해보기)

svg파일 스타일 설정
fill 채우기
stroke 외형 선 색상
strokeWidth 외형 선 두께

ReactJS 조건부 렌더링 때 애니메이션 적용하는 방법
<AnimatePresence> 컴포넌트로 조건부 렌더링 문장 감싸주고 조건부로 보여줄 컴포넌트에 variants props 전달 // initial, animate, exit << 이게 추가됨

exitBeforeEnter 옵션 : animatepresence 컴포넌트를 사용하면 animate, exit 애니메이션이 동시에 실행되는데 만약 exit 애니메이션 종료 후 animatie 애니메이션이 실행되길 원하면 exitBeforeEnter 옵션을 주면 구현 가능함

layoutID를 통한 컴포넌트간 애니메이션 생성
<circle>라는 컴포넌트가 있다고 가정할 때
각각의 circle 컴포넌트는 엄밀히 말하면 다른 컴포넌트이지만 layoutID를 동일하게 부여해서 연결이 가능하다
연결 후에는 애니메이션 생성도 해서 훨씬 부드러운 효과를 연출함