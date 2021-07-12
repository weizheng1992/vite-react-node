/*
 * @Author: weizheng
 * @Date: 2021-06-18 14:08:50
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-08 17:02:28
 */
export interface UserParams {
  username: string;
  password: string;
}

export interface UserInfo {
  id: number;
  username: string;
  nickname: string;
  password: string;
  avator: string;
  sex: number;
  gmt_create: Date;
  gmt_modify: Date;
}
