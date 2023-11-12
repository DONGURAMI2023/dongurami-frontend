import { IUserData } from "./Login";

export interface IBadge {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface IUserProfileData {
  user: IUserData;
  areas: any[];
  point: number;
  items: any[];
  badges: IBadge[];
  message: string;
}
