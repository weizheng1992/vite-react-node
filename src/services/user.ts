/*
 * @Author: weizheng
 * @Date: 2021-06-28 10:48:47
 * @LastEditors: zz
 * @LastEditTime: 2021-06-29 20:35:42
 */
// 登录接口的查询
export const logSelect = (user: string, pwd: string) => {
  return `select * from sys_user where username='${user}' and password='${pwd}'`;
};

// 注册接口的插入
export const regInsert = (user: string, pwd: string) => {
  return `insert into sys_user(username, password, nickname ,email) values('${user}', '${pwd}','zz1', 'email')`;
};

// 注册账户的查询
export const regSelect = (user: string) => {
  return `select * from sys_user where username='${user}'`;
};

/**
 * @name: weizheng
 * @desc: 请求用户列表 分页
 * @param {*} size 默认 10
 * @param {number} page 开始 1
 * @return {*}
 */
export const userListSelect = (page: number, size = 10): string => {
  const min = (page - 1) * size;
  return `select * from sys_user limit ${min},${size}`;
};
