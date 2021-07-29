/*
 * @Author: zz
 * @Date: 2021-06-29 20:30:36
 * @LastEditors: zz
 * @LastEditTime: 2021-07-13 14:35:15
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
  if (!names) {
    return `select * from sys_user limit ${start},${size}`;
  }
  return `select * from sys_user where username='${names}' limit ${start},${size}`;
};

export const userNameList = () => {
  return 'select * from sys_user';
};
