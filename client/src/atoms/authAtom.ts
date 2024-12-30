import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'authState',
  storage: localStorage,
});

export interface User {
  profileImg: string;
  username: string;
  fullName: string;
}

export const authAtom = atom<{
  isAuth: boolean;
  user: User | null;
}>({
  key: 'authState',
  default: {
    isAuth: false,
    user: null,
  },
  effects_UNSTABLE: [persistAtom], // persist the state across reloads
});
