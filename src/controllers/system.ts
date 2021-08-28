/*
 * @Author: zz
 * @Date: 2021-06-29 20:30:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-10 11:38:07
 */

import { querySql } from '@/config/config.default';
import { systemConfig } from '@/config';
import { userNameSelect, userNameList, userNameDelete } from '@/services/system';
import { Request, Response, NextFunction } from 'express';
import { sendMes } from '@/utils/sendMes';
const { CODE_SUCCESS } = systemConfig;
import { UserInfo } from '@/controllers/model/userModel';

type Data = {
  data: UserInfo[];
  total: number;
  current: number;
  pageSize: number;
};

// 用户列表的查询
const userNameSel = async (req: Request, res: Response, next: NextFunction) => {
  const { page, size } = req.body;
  const list: UserInfo[] = await querySql<UserInfo[]>(userNameList());
  const selecData: UserInfo[] = await querySql<UserInfo[]>(userNameSelect(req.body));
  const data: Data = {
    data: selecData,
    total: list.length,
    current: page,
    pageSize: size,
  };
  res.json(sendMes(CODE_SUCCESS, 'success', data));
};

// 用户列表的删除
const userNameDel = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;
  await querySql<UserInfo[]>(userNameDelete(id));
  const list: UserInfo[] = await querySql<UserInfo[]>(userNameList());
  console.log('list :>> ', list);
  res.json(sendMes(CODE_SUCCESS, 'success'));
};
export { userNameSel, userNameDel };
