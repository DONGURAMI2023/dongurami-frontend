import { LineWave } from "react-loader-spinner";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingConatainer>
      <LineWave
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        middleLineColor="red"
      />
    </LoadingConatainer>
  );
};

const LoadingConatainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loading;
