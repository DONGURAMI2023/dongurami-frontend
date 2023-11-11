import KakaoLogin from "react-kakao-login";
import Svg from "../../components/Svg";

const SocialKakao = () => {
	const kakaoClientId = "1919fcf5533fffa62bf6a40985a887ad";
	const kakaoOnSuccess = async (data: any) => {
		console.log(data);
		// const idToken = data.response.access_token; // 엑세스 토큰 백엔드로 전달
	};
	const kakaoOnFailure = (error: any) => {
		console.log(error);
	};
	return (
		<>
			<KakaoLogin
				token={kakaoClientId}
				onSuccess={kakaoOnSuccess}
				onFail={kakaoOnFailure}
				render={({ onClick }) => (
					<Svg onClick={() => onClick()} icon="icon_btn_kakao" />
				)}
			/>
		</>
	);
};

export default SocialKakao;
