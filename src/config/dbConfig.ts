export interface DbConfig {
  host: string;
  port: string;
  user: string;
  password: string | number;
  database: string;
  connectTimeout: number;
}

export const dbConfig = {
  host: '8.142.136.225', // 主机名称，一般是本机
  port: '3306', // 数据库的端口号，如果不设置，默认是3306
  user: 'root', // 创建数据库时设置用户名
  database: 'my_test', // 创建的数据库
  connectTimeout: 5000, // 连接超时
};
