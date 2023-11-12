import { useState } from "react";
import styled from "styled-components";
import { ILoginReqInfo } from "../../model/Login";
import Svg from "../../components/Svg";
import KakaoLogin from "./KakaoLogin";
import { useQuery } from "@tanstack/react-query";
import kakaoImage from "../../assets/kakao_login_medium_wide.png";

const REACT_REST_API_KEY = "3d92f7078f51f3e20afad84b56b54d79";
const REDIRECT_URL = "http://localhost:5173/login/oauth";

const kakaoURL =
  "https://kauth.kakao.com/oauth/authorize?client_id=" +
  REACT_REST_API_KEY +
  "&redirect_uri=" +
  REDIRECT_URL +
  "&response_type=code";

export default function Login() {
  const INITIAL_LOGIN_REQ_INFO: ILoginReqInfo = {
    username: "",
    password: "",
  };

  const [loginReqInfo, setLoginReqInfo] = useState<ILoginReqInfo>(
    INITIAL_LOGIN_REQ_INFO
  );

  const loginWithKakao = () => {
    // 카카오 로그인 클릭 시
    window.location.href = kakaoURL;
  };

  const fetchLogin = async () => {
    // API 호출 또는 데이터 가져오기 로직
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
  };

  const { isPending, isError, data, error } = useQuery<string>({
    queryKey: ["login"],
    queryFn: fetchLogin,
  });

  console.log("data", data);

  return (
    <>
      {isPending && <div>Loading...</div>}
      <LoginContainer>
        <HeaderContainer>
          <Title>LOGIN</Title>
        </HeaderContainer>
        <MainContainer>
          <Form onSubmit={(e) => e.preventDefault()}>
            <label className="empty:hidden" htmlFor="username"></label>
            <input
              className="outline-none border border-gray-400 w-full rounded leading-10 px-1"
              value={loginReqInfo.username}
              onChange={(e) =>
                setLoginReqInfo((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              autoComplete="off"
              id="username"
              name="username"
              placeholder="아이디"
            ></input>

            <label className="empty:hidden" htmlFor="password"></label>
            <input
              type="password"
              className="outline-none border border-gray-400 w-full rounded leading-10 px-1"
              value={loginReqInfo.password}
              onChange={(e) =>
                setLoginReqInfo((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              autoComplete="off"
              id="password"
              name="password"
              placeholder="비밀번호"
            ></input>

            <button
              className="bg-primary text-white w-full h-10 hover:brightness-90 active:scale-95"
              onClick={() => {
                alert(JSON.stringify(loginReqInfo));
              }}
              type="button"
            >
              로그인하기
            </button>

            <ul className="w-full justify-between flex">
              <li>
                <button className="hover:underline">회원가입</button>
              </li>
              <li>
                <button className="hover:underline">
                  아이디 / 비밀번호 찾기
                </button>
              </li>
            </ul>

            {/* <ul className="w-full justify-center gap-5 flex">
              <button>
                <KakaoLogin></KakaoLogin>
              </button>
              <button>
                <Svg icon="icon_btn_naver"></Svg>
              </button>
              <button>
                <Svg icon="icon_btn_google"></Svg>
              </button>
            </ul> */}
            <KakaoLoginContainer>
              <KakaoLoginButton onClick={loginWithKakao}>
                <img src={kakaoImage} alt="kakao" />
              </KakaoLoginButton>
            </KakaoLoginContainer>
          </Form>
        </MainContainer>
      </LoginContainer>
    </>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85vh;
`;

const HeaderContainer = styled.header`
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: xx-large;
  margin-bottom: 2rem;
  letter-spacing: 4px;
`;

const MainContainer = styled.main`
  width: 100%;
  max-width: 400px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2rem;
`;

const KakaoLoginContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const KakaoLoginButton = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 4px;
  background-color: #fee500;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
