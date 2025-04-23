import styled from "styled-components";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

// 전체 박스를 담을 공간 래퍼
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// 박스의 구현 역할마다 구분하기 위해 박스를 grid display로 2개씩 배치
const BoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
`;

// variants 기능 구현 박스
const VariantsBox = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
// variants 기능 구현 박스 내 써클
const VariantsCircle = styled(motion.div)`
  background-color: white;
  height: 50px;
  width: 50px;
  border-radius: 35px;
  place-self: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
// gesture 모션 구현 박스
const GestureBox = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
// Dragging 모션 구현 박스
const DraggingBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
// Dragging 모션 구현 이너박스
const DraggingInnerBox = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
// MotionValue 값을 활용한 모션 구현 박스
const MotionValueBox = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  color: black;
  font-size: 50px;
  height: 200px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
// Slider 모션 구현 박스
const SliderBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 40px;
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
// layout 모션 구현 박스
const LayoutBox = styled(motion.div)`
  height: 200px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Grid = styled.div`
  display: grid;
  width: 500vw;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;

  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      // 자식 요소에게 공통된 딜레이
      delayChildren: 0.5,
      // 개별 자식 요소에 순차적인 딜레이
      staggerChildren: 0.2,
    },
  },
};

const circleVariants = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

const EventVariants = {
  hover: {
    scale: 1.2,
    rotateZ: 90,
    transition: { duration: 0.125 },
  },
  click: { scale: 1, borderRadius: "100px" },
  drag: { backgroundColor: "rgb(46,204,113" },
};

const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white;
    stroke-width: 2;
  }
`;

const logoVariants = {
  start: { pathLength: 0, fill: "rgba(255,255,255,0)" },
  end: {
    pathLength: 1,
    fill: "rgba(255,255,255,1)",
    transition: {
      // 선이 다 그려지는 데 5s, 채워지는 데 3초 delay 후 2초만에 채워짐 // 총 5s
      default: { duration: 5, fill: { duration: 2, delay: 3 } },
    },
  },
};

const animateVarints = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    y: 20,
  },
};

const sliderVarints = {
  entry: (back: boolean) => ({
    x: back ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (back: boolean) => ({
    x: back ? 500 : -500,
    opacity: 0,
    scale: 0,
  }),
};

const layoutVariants = {};

function App() {
  // const ref = useRef<HTMLDivElement>(null);
  // const x = useMotionValue(0);
  // const transform = useTransform(x, [-800, 0, 800], [2, 1, 0]);
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const prevPlease = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };
  const nextPlease = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const [id, setId] = useState<null | String>(null);
  return (
    <Wrapper>
      <Grid>
        {[1, 2, 3, 4].map((i) => (
          <LayoutBox onClick={() => setId(i + "")} key={i} layoutId={i + ""} />
        ))}
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          >
            <LayoutBox
              onClick={() => setId(null)}
              layoutId={id + ""}
              style={{ width: 400, height: 200 }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      {/* <AnimatePresence custom={back}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
          i === visible ? (
            <SliderBox
              custom={back}
              variants={sliderVarints}
              initial="entry"
              animate="center"
              exit="exit"
              key={visible}
            >
              {visible}
            </SliderBox>
          ) : null
        )}
      </AnimatePresence>
      <button onClick={prevPlease}>이전</button>
      <button onClick={nextPlease}>다음</button>
      <Svg
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <motion.path
          variants={logoVariants}
          initial={"start"}
          animate={"end"}
          d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
        ></motion.path>
      </Svg>
      <BoxWrapper>
        <VariantsBox variants={boxVariants} initial="start" animate="end">
          <VariantsCircle variants={circleVariants} />
          <VariantsCircle variants={circleVariants} />
          <VariantsCircle variants={circleVariants} />
          <VariantsCircle variants={circleVariants} />
        </VariantsBox>
        <GestureBox
          variants={EventVariants}
          whileHover="hover"
          whileTap="click"
        />
        <DraggingBox ref={ref}>
          <DraggingInnerBox
            variants={EventVariants}
            drag
            dragConstraints={ref}
            dragSnapToOrigin
            dragElastic={0.5}
            whileDrag="drag"
          ></DraggingInnerBox>
        </DraggingBox>
        <MotionValueBox
          style={{ x, scale: transform }}
          drag="x"
          dragSnapToOrigin
        >
          {x}
        </MotionValueBox>
      </BoxWrapper> */}
    </Wrapper>
  );
}

export default App;
