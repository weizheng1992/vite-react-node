/*
 * @Author: zz
 * @Date: 2021-06-29 20:30:01
 * @LastEditors: zz
 * @LastEditTime: 2021-07-13 14:33:27
 */

import { querySql } from '@/config/config.default';
import { systemConfig } from '@/config';
import { userNameSelect, userNameList } from '@/services/system';
import { Request, Response, NextFunction } from 'express';
import { sendMes } from '@/utils/sendMes';
const { CODE_SUCCESS } = systemConfig;
import { UserInfo } from '@/controllers/model/userModel';

type Data = {
  data: UserInfo[];
  total: number;
};

const userName = async (req: Request, res: Response, next: NextFunction) => {
  const list: UserInfo[] = await querySql<UserInfo[]>(userNameList());
  const selecData: UserInfo[] = await querySql<UserInfo[]>(userNameSelect(req.body));
  const data: Data = {
    data: selecData,
    total: list.length,
  };
  res.json(sendMes(CODE_SUCCESS, 'success', data));
};
export { userName };
