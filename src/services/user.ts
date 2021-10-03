/*
 * @Author: weizheng
 * @Date: 2021-06-28 10:48:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-10 11:03:21
 */
// 登录接口的查询
export const logSelect = (user: string, pwd: string) => {
  return `select * from sys_user where username='${user}' and password='${pwd}'`;
};

// 注册接口的插入
export const regInsert = (user: string, pwd: string) => {
  // return `insert into sys_user(username, password, nickname ,email) values('${user}', '${pwd}','zz1', 'email')`;
  return `INSERT INTO sys_user (username, password, salt, email, mobile, status, dept_id, create_time) VALUES ('${user}', '${pwd}', 'YzcmCZNvbXocrsz9dm8e', 'root@renren.io', '13612345678', '1', '1', '2021-11-11 11:11:11')`;
};

// 注册账户的查询
export const regSelect = (username: string) => {
  return `select * from sys_user where username='${username}'`;
};

/**
 * @name: weizheng
 * @desc: 请求用户列表 分页
 * @param {*} size 默认 10
 * @param {number} page 开始 1
 * @return {*}
 */
export const userListSelect = (size = 10, page: number): string => {
  return `select * from student limit(${page}-1)*${size},${size}`;
};

// 注册账户的查询
export const selectUserById = (userId: number): string => {
  return `select * from sys_user where user_id='${userId}'`;
};

// 更新名字
export const updataName = (username: string, userId: number): string => {
  return `UPDATE sys_user SET username = '${username}' where user_id = ${userId}`;
};
