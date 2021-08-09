/*
 * @Author: zz
 * @Date: 2021-06-29 20:30:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-09 20:16:41
 */

/**
 * @name: zz
 * @desc: 用户注册账户信息
 * @msg:
 * @param {*}
 * @return {*}
 */

// 用户列表的条件查询
export const userNameSelect = ({ size = 10, page = 1, names = null }: any): any => {
  const start = (page - 1) * size;
  if (!names) {
    return `select * from sys_user limit ${start},${size}`;
  }
  return `select * from sys_user where username='${names}' limit ${start},${size}`;
};

// 用户列表的数据查询
export const userNameList = () => {
  return 'select * from sys_user';
};

// 用户列表的删除
export const userNameDelete = (id: number) => {
  return `delete * from sys_user where user_id =${id}`;
};
