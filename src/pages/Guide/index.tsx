import { useState } from "react";
import styled from "styled-components";
import clsx from "clsx";
import Svg from "../../components/Svg";
import { PROGRESS_LAST_GUIDE, TOTAL_PROGRESS } from "../../consts/guide";
import { useNavigate } from "react-router-dom";
import { splitByNewLine } from "../../utils";
import GuideStep from "./GuideStep";
import { AnimatePresence } from "framer-motion";

export default function Guide() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<number>(0);

  const GUIDES = [
    {
      title: "동을 방문하고 건물을 지어봐요!",
      description: `많이 방문할 수록 포인트가 쑥쑥!
      경쟁을 통해 내 땅을 넓혀봐요.
      많은 건물을 차지할 수록 보상도 쑥쑥 :)
      랜드마크를 지어서 완전히 
      내 땅으로도 만들어보세요!`,
      image: (
        <Svg className=" !max-w-max !max-h-max" icon="guide_progress_0"></Svg>
      ),
    },
    {
      title: "결제만 하면 포인트 획득!",
      description: `처음 방문하는 곳은 포인트가 3배!
      포인트로 건물도 구매하고
      매달 환급을 받아요.
      ( 건물과 포인트는 매달 초기화 되며 행복 페이로 들어갑니다. )`,
      image: (
        <Svg className=" !max-w-max !max-h-max" icon="guide_progress_1"></Svg>
      ),
    },
    {
      title: "남의 땅을 살 수 있어요!",
      description: `땅을 구매 해서  내 땅을 넓혀  보세요.
      연속된 땅을 가지면 추가 보너스가 있어요!
      아이템으로 내 땅이 뺏기지 않게 지켜봐요!
      `,
      image: (
        <Svg className=" !max-w-max !max-h-max" icon="guide_progress_2"></Svg>
      ),
    },
    {
      title: "건물 별로 능력이 달라요!",
      description: ``,
      image: (
        <div className="w-full flex flex-col items-center gap-6 h-[350px] overflow-scroll scrollbar-hide">
          {PROGRESS_LAST_GUIDE.map((lastguide) => (
            <div className="w-full flex justify-between items-center">
              <Svg
                className=" !max-w-max !max-h-max"
                icon={lastguide.icon}
              ></Svg>
              <p className="w-[250px] flex flex-col items-center justify-center">
                {splitByNewLine(lastguide.description)}
              </p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const guide = GUIDES[progress];

  return (
    <GuideContainer>
      <HeaderContainer>
        <ProgressbarContainer>
          {new Array(TOTAL_PROGRESS).fill(null).map((_, i) => (
            <li
              key={`guide-progress-list-${i}`}
              onClick={() => setProgress(i)}
              className={clsx([
                "w-full cursor-pointer h-[6px] transition-all duration-500",
                i === progress ? "bg-black" : "bg-black/30",
              ])}
            />
          ))}
        </ProgressbarContainer>
      </HeaderContainer>
      <MainContainer>
        <AnimatePresence>
          {GUIDES.map((guide, i) => {
            if (i === progress)
              return (
                <GuideStep
                  key={`guide-step-${i}`}
                  title={guide.title}
                  desc={guide.description}
                  img={guide.image}
                ></GuideStep>
              );
          })}
        </AnimatePresence>
      </MainContainer>
      <FooterContainer>
        <button
          onClick={() => {
            if (progress < TOTAL_PROGRESS - 1) setProgress((prev) => prev + 1);
            else navigate("/map");
          }}
          className="w-full rounded text-white text-center bg-primary py-2 hover:brightness-95 active:scale-95"
        >
          다음
        </button>
      </FooterContainer>
    </GuideContainer>
  );
}

const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 85vh;
  gap: 3rem;
  position: relative;
`;

const ProgressbarContainer = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  position: absolute;
  width: 400px;
  top: 15vh;
`;

const HeaderContainer = styled.header`
  width: 400px;
`;

const MainContainer = styled.main`
  width: 400px;
  padding-top: 15vh;
`;

const FooterContainer = styled.footer`
  width: 400px;
  position: absolute;
  bottom: 0vh;
`;
