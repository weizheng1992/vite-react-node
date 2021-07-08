/*
 * @Author: zz
 * @Date: 2021-06-29 20:30:01
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-08 17:24:06
 */

import { querySql } from '@/config/config.default';
import { systemConfig } from '@/config';
import { userNameSelect } from '@/services/system';
import { Request, Response, NextFunction } from 'express';
import { sendMes } from '@/utils/sendMes';
const { CODE_SUCCESS } = systemConfig;
import { UserInfo } from '@/controllers/model/userModel';

const userName = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body;
  const data: UserInfo[] = await querySql<UserInfo[]>(userNameSelect(user));
  res.json(sendMes(CODE_SUCCESS, 'success', data));
};
export { userName };
