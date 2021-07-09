/*
 * @Author: zz
 * @Date: 2021-06-29 20:30:36
 * @LastEditors: zz
 * @LastEditTime: 2021-07-08 17:00:18
 */

/**
 * @name: zz
 * @desc: 用户注册账户信息
 * @msg:
 * @param {*}
 * @return {*}
 */
export const userNameSelect = ({ size = 10, page = 1, names = null }: any): any => {
  const start = (page - 1) * size;
  const user = names ? `where username='${names}'`: `limit ${start},${size}`
  return `select * from sys_user ${user}`;
};

// export const userListSelect = (size = 10, page: number):string => {
//   return `select * from student limit(${page}-1)*${size},${size}`;
// };
