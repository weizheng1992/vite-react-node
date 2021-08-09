/*
 * @Author: weizheng
 * @Date: 2021-07-08 17:08:56
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 16:02:37
 */
import { MenuItem } from '@/controllers/sys/model/menuModel';
export const menuList = () => {
  return `select * from sys_menu`;
};

// 更新菜单
export const updateMenuSql = ({ name, menuId, url, icon, perms, orderNum }: MenuItem) => {
  return `UPDATE sys_menu SET name="${name}", url="${url}", icon="${icon}", perms= "${perms}", order_num=${orderNum} WHERE menu_id = ${menuId}`;
};
