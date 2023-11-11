import styled from "styled-components";
import logoImage from "../assets/logo.png";
import { IoPersonCircleOutline } from "react-icons/io5";

function NavBar() {
  return (
    <NavBarContainer>
      <InfoContainer>
        <div
          style={{
            position: "relative",
            left: "4px",
            top: "3px",
            width: "100px",
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
      <MyPageContainer>
        <IoPersonCircleOutline size="30" />
      </MyPageContainer>
    </NavBarContainer>
  );
}

const InfoContainer = styled.div`
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
  width: 100px;
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
