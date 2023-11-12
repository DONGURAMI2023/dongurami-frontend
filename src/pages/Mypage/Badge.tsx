import styled from "styled-components";
import CustomNav from "components/CustomNav";
import Flex from "components/Flex";
import IconButton from "components/IconButton";
import { IoPersonCircleOutline, IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { IBadge, IUserProfileData } from "model/UserInfo";
import { useRecoilValue } from "recoil";
import { userState } from "pages/Store/userState";
import { getApi } from "utils/http";
import { useState } from "react";
import Loading from "components/Loading";
import { BADGES } from "../../consts/badge";

const Badge = () => {
  const user = useRecoilValue(userState);
  const [badgeDataArray, setBadgeDataArray] = useState<IBadge[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  // /users/{userId}/profile
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        setIsFetching(true);
        const response = await getApi<IUserProfileData>({
          url: `users/${user.id}/profile`,
        });
        if (response) {
          setBadgeDataArray(response.badges);
        }
      } catch (e) {
        alert("프로필 불러오기 실패");
      } finally {
        setIsFetching(false);
      }
    };
    getUserProfile();
  }, []);

  let badgeIdArray: number[] = [];
  if (badgeDataArray) {
    badgeIdArray = badgeDataArray.map((badge) => badge.id);
  }

  const navigate = useNavigate();

  const handleClickCancelBtn = () => {
    navigate(-1);
  };

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : (
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
                {BADGES.map((badge, index) => (
                  <BadgeContainer key={index}>
                    <Image
                      key={index}
                      src={
                        badgeIdArray.includes(index)
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
      )}
    </>
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
