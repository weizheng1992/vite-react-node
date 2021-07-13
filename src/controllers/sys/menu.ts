/*
 * @Author: weizheng
 * @Date: 2021-07-08 16:51:30
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-13 14:57:28
 */
import { querySql } from '@/config/config.default';
import { systemConfig } from '@/config';
import { menuList } from '@/services/sys/menu';
import { Request, Response, NextFunction } from 'express';
import { sendMes } from '@/utils/sendMes';
const { CODE_SUCCESS } = systemConfig;
import { UserInfo } from '@/controllers/model/userModel';
import { toHumpFun, listToTree } from '@/utils';

const menus = async (req: Request, res: Response, next: NextFunction) => {
  const data: UserInfo[] = await querySql<UserInfo[]>(menuList());
  const dataTo = toHumpFun(data);
  const list = listToTree(dataTo);
  res.json(sendMes(CODE_SUCCESS, 'success', list));
};
export { menus };
