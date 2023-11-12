import Loading from "components/Loading";
import { useEffect } from "react";
import { getApi } from "utils/http";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { IUserData } from "../../model/Login";
import {
  userEmail,
  userImageURL,
  userName,
  userPoint,
  userState,
} from "pages/Store/userState";

// const value = useRecoilValue(isDarkAtom);
// : value를 가져오기

// const setValue = useSetRecoilState(isDarkAtom);
// : value를 수정하기

// const [value, setValue] = useRecoilState(toDoState);
// : value를 가져오고, 수정하기

const REACT_REST_API_KEY = "3d92f7078f51f3e20afad84b56b54d79";
const REDIRECT_URL = "http://localhost:5173/login/oauth";

const kakaoURL =
  "https://kauth.kakao.com/oauth/authorize?client_id=" +
  REACT_REST_API_KEY +
  "&redirect_uri=" +
  REDIRECT_URL +
  "&response_type=code";

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get("code");

  const setUserState = useSetRecoilState(userState);

  // authCode넘겨주기
  const sendAuthCode = async () => {
    try {
      const response = await getApi<IUserData>({
        url: `users/kakao/callback`,
        params: { code: code },
      });
      // 로그인 성공

      if (response) {
        setUserState({
          id: response.id,
          name: response.username,
          email: response.email,
          imageUrl: response.profile_image,
          point: response.point,
          token: response.token,
        });
        navigate("/map");
      }
    } catch (e) {
      alert("로그인 실패");
    }
  };

  useEffect(() => {
    if (code) {
      sendAuthCode();
    }
  }, [code]);

  return <Loading />;
};

export default KakaoRedirectHandler;
