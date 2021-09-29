export type SystemConfig = {
  PORT: number;
  CODE_ERROR: number;
  CODE_SUCCESS: number;
  CODE_TOKEN_EXPIRED: number;
  PRIVATE_KEY: string;
  JWT_EXPIRED: number;
};
export const systemConfig: SystemConfig = {
  PORT: 8099,
  CODE_ERROR: 1, // 请求响应失败code码
  CODE_SUCCESS: 0, // 请求响应成功code码
  CODE_TOKEN_EXPIRED: 401, // 授权失败
  PRIVATE_KEY: 'spkiewz', // 自定义jwt加密的私钥
  JWT_EXPIRED: 60 * 60 * 24, // 过期时间24小时
};

