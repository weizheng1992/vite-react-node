import { querySql, queryOne } from '@/utils';
import { Md5 as md5 } from '@/utils/md5';
import { UserParams, UserInfo } from './model/searchModel';

//查询用户信息
export const queryUser = (body: UserParams): Promise<any> => {
  let { username, password } = body;
  // md5加密
  password = md5(password);
  const query = `select * from sys_user where username='${username}' and password='${password}'`;
  return querySql(query);
};

// 通过用户名查询用户信息
export const findUser = async (username: string): Promise<any> => {
  const query = `select id, username from sys_user where username='${username}'`;
  return await queryOne(query);
};
// 插入用户信息
export const insertUser = async (body: UserParams): Promise<any> => {
  let { username, password } = body;
  // md5加密
  password = md5(password);
  const query = `insert into sys_user(username, password) values('${username}', '${password}')`;
  return await querySql(query);
};
