export type SystemConfig = {
  PORT: number;
  CODE_ERROR: number;
  CODE_SUCCESS: number;
  CODE_TOKEN_EXPIRED: number;
  PRIVATE_KEY: string;
  JWT_EXPIRED: number;
};
export const systemConfig: SystemConfig = {
  PORT: 8003,
  CODE_ERROR: 1, // 请求响应失败code码
  CODE_SUCCESS: 0, // 请求响应成功code码
  CODE_TOKEN_EXPIRED: 401, // 授权失败
  PRIVATE_KEY: 'jackchen', // 自定义jwt加密的私钥
  JWT_EXPIRED: 60 * 60 * 24, // 过期时间24小时
};

export interface DbConfig {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
  connectTimeout: number;
}
export const dbConfig = {
  host: 'localhost', // 主机名称，一般是本机
  port: '3306', // 数据库的端口号，如果不设置，默认是3306
  user: 'root', // 创建数据库时设置用户名
  password: process.env.MYSQL_PWD, // 创建数据库时设置的密码
  database: 'my_test', // 创建的数据库
  connectTimeout: 5000, // 连接超时
};
