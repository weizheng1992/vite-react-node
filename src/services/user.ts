/*
 * @Author: weizheng
 * @Date: 2021-06-28 10:48:47
 * @LastEditors: weizheng
 * @LastEditTime: 2021-06-29 17:39:15
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
export const userListSelect = (size = 10, page: number):string => {
  return `select * from student limit(${page}-1)*${size},${size}`;
};
