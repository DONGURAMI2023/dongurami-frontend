import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// const value = useRecoilValue(isDarkAtom);
// : value를 가져오기

// const setValue = useSetRecoilState(isDarkAtom);
// : value를 수정하기

// const [value, setValue] = useRecoilState(toDoState);
// : value를 가져오고, 수정하기

const { persistAtom } = recoilPersist();

interface IUserState {
  point: number;
  name: string;
  email: string;
  imageUrl: string;
  token: string;
}

export const userState = atom<IUserState>({
  key: "userState",
  default: {
    point: 0,
    name: "",
    email: "",
    imageUrl: "",
    token: "",
  },
  effects_UNSTABLE: [persistAtom],
});
