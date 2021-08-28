/*
 * @Author: weizheng
 * @Date: 2021-06-18 14:08:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-13 16:56:17
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

export interface RegisterRes {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}
