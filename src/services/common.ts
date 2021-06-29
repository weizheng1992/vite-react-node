/*
 * @Author: weizheng
 * @Date: 2021-06-29 17:40:19
 * @LastEditors: weizheng
 * @LastEditTime: 2021-06-29 17:41:00
 */
export const countSelect = (table: string): string => {
  return `SELECT COUNT(*) FROM ${table}`;
};
