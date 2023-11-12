import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// const value = useRecoilValue(isDarkAtom);
// : value를 가져오기

// const setValue = useSetRecoilState(isDarkAtom);
// : value를 수정하기

// const [value, setValue] = useRecoilState(toDoState);
// : value를 가져오고, 수정하기

const { persistAtom } = recoilPersist();

export const userPoint = atom({
  key: "userPoint",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const userEmail = atom({
  key: "userEmail",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userImageURL = atom({
  key: "userImageURL",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
