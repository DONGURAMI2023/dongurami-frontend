import styled from "styled-components";
import logoImage from "../assets/logo.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  const moveToInfo = () => {
    navigate("/guide");
  };

  const moveToMypage = () => {
    navigate("/mypage");
  };

  return (
    <NavBarContainer>
      <InfoContainer onClick={moveToInfo}>
        <div
          style={{
            position: "relative",
            left: "4px",
            width: "70px",
            fontSize: "15px",
            fontWeight: "bold",
          }}
        >
          HOW?
        </div>
      </InfoContainer>
      <LogoContainer>
        <img
          style={{
            position: "relative",
            top: "5px",
            right: "4px",
            width: "100px",
            height: "70px",
          }}
          src={logoImage}
          alt="logo"
        />
      </LogoContainer>
      <MyPageContainer onClick={moveToMypage}>
        <IoPersonCircleOutline size="30" />
      </MyPageContainer>
    </NavBarContainer>
  );
}

const InfoContainer = styled.div`
  cursor: pointer;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyPageContainer = styled.div`
  cursor: pointer;
  width: 70px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 50px;
  background-color: #fff;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
`;

export default NavBar;
