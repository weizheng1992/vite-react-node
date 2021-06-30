/*
 * @Author: zz
 * @Date: 2021-06-29 20:30:36
 * @LastEditors: zz
 * @LastEditTime: 2021-06-30 19:07:36
 */

/**
 * @name: zz
 * @desc: 用户注册账户信息
 * @msg: 
 * @param {*}
 * @return {*} 
 */
 export const userNameSelect = (user: string) => {
  return `select * from sys_user where username='${user}'`;
}

// export const userListSelect = (size = 10, page: number):string => {
//   return `select * from student limit(${page}-1)*${size},${size}`;
// };