/*
 * @Author: zz
 * @Date: 2021-06-29 20:30:36
 * @LastEditors: zz
 * @LastEditTime: 2021-07-06 16:36:05
 */

/**
 * @name: zz
 * @desc: 用户注册账户信息
 * @msg:
 * @param {*}
 * @return {*}
 */
export const userNameSelect = ({ size = 10, page = 1}) => {
  const start = `${page}-1)*${size}`
  return `select * from sys_user limit (${start},${size}`;
};

// export const userListSelect = (size = 10, page: number):string => {
//   return `select * from student limit(${page}-1)*${size},${size}`;
// };
