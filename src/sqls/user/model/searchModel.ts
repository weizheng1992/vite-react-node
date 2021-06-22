export interface UserParams {
  username: string;
  password: string;
}

export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  avator: string;
  sex: number;
  gmt_create: Date;
  gmt_modify: Date;
}
