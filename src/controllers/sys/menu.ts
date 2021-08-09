/*
 * @Author: weizheng
 * @Date: 2021-07-08 16:51:30
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-21 22:25:58
 */
import { queryOne, querySql } from '@/config/config.default';
import { systemConfig } from '@/config';
import { menuList, updateMenuSql } from '@/services/sys/menu';
import { Request, Response, NextFunction } from 'express';
import { sendMes } from '@/utils/sendMes';
const { CODE_SUCCESS, CODE_ERROR } = systemConfig;
import { MenuItem } from '@/controllers/sys/model/menuModel';
import { toHumpFun, listToTree } from '@/utils';

const menus = async (req: Request, res: Response, next: NextFunction) => {
  const data: MenuItem[] = await querySql<MenuItem[]>(menuList());
  const dataTo = toHumpFun(data);
  const list = listToTree(dataTo);
  res.json(sendMes(CODE_SUCCESS, 'success', list));
};

const updateMenu = async (req: Request, res: Response, next: NextFunction) => {
  console.log('req.body', req.body);
  const data = await queryOne(updateMenuSql(req.body));
  if (data.affectedRows) {
    res.json(sendMes(CODE_SUCCESS, 'success', {}));
  } else {
    res.json(sendMes(CODE_ERROR, '数据不对！', {}));
  }
};

export { menus, updateMenu };
