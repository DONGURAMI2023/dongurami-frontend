import styled from "styled-components";
import CustomNav from "components/CustomNav";
import Flex from "components/Flex";
import IconButton from "components/IconButton";
import { IoPersonCircleOutline, IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const mockData = {
  user: {
    id: 1,
    email: "jongunj82@gmail.com",
    username: ".",
    profile_image:
      "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
  },
  areas: [],
  items: [],
  badges: [0, 1, 2],
  message: "profile success",
};

const badges = [
  {
    src: "../../../public/icon-badge1.png",
    selectedSrc: "../../../public/icon-badge1-selected.png",
    title: "1월 동장",
  },
  {
    src: "../../../public/icon-badge2.png",
    selectedSrc: "../../../public/icon-badge2-selected.png",
    title: "카페인 중독",
  },
  {
    src: "../../../public/icon-badge3.png",
    selectedSrc: "../../../public/icon-badge3-selected.png",
    title: "1월 소비왕",
  },
  {
    src: "../../../public/icon-badge4.png",
    selectedSrc: "../../../public/icon-badge4-selected.png",
    title: "건물주",
  },
  {
    src: "../../../public/icon-badge5.png",
    selectedSrc: "../../../public/icon-badge5-selected.png",
    title: "인수 왕",
  },
  {
    src: "../../../public/icon-badge6.png",
    selectedSrc: "../../../public/icon-badge5-selected.png",
    title: "30일 연속 출석",
  },
];

const Badge = () => {
  const navigate = useNavigate();

  const handleClickCancelBtn = () => {
    navigate(-1);
  };

  return (
    <MapContainer>
      <CustomNav
        hideShadow
        leftComponent={
          <Flex type="horizontalCenter" className="gap-3 whitespace-nowrap">
            <IconButton>
              <IoPersonCircleOutline size="24" />
            </IconButton>
            나의 뱃지 획득 현황
          </Flex>
        }
        rightComponent={
          <IconButton onClick={() => handleClickCancelBtn()}>
            <IoClose size="24"></IoClose>
          </IconButton>
        }
      />
      <MainContainer>
        <MainWrapper>
          <Container>
            {badges.map((badge, index) => (
              <BadgeContainer>
                <Image
                  key={index}
                  src={
                    mockData.badges.includes(index)
                      ? badge.selectedSrc
                      : badge.src
                  }
                  alt={badge.title}
                />
                <Title>{badge.title}</Title>
              </BadgeContainer>
            ))}
          </Container>
        </MainWrapper>
      </MainContainer>
    </MapContainer>
  );
};

const MapContainer = styled.div`
  padding-top: 50px;
`;

const MainContainer = styled.main`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const MainWrapper = styled.div`
  background-color: #f4f3f2da;
  width: 100%;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* gap 10px except most left, most right */
  gap: 10px;
`;

const Image = styled.img`
  width: 150px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Badge;
