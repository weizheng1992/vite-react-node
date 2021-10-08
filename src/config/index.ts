/*
 * @Author: weizheng
 * @Date: 2021-06-25 11:23:34
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-21 22:06:04
 */
export type SystemConfig = {
  PORT: number;
  CODE_ERROR: number;
  CODE_SUCCESS: number;
  CODE_TOKEN_EXPIRED: number;
  PRIVATE_KEY: string;
  JWT_EXPIRED: string;
};
export const systemConfig: SystemConfig = {
  PORT: 8099,
  CODE_ERROR: 1, // 请求响应失败code码
  CODE_SUCCESS: 0, // 请求响应成功code码
  CODE_TOKEN_EXPIRED: 401, // 授权失败
  PRIVATE_KEY: 'jackchen', // 自定义jwt加密的私钥
  JWT_EXPIRED: '2 days', // 过期时间24小时
};
