/*
 * @Author: zz
 * @Date: 2021-06-29 20:30:01
 * @LastEditors: zz
 * @LastEditTime: 2021-06-30 19:36:32
 */

import { querySql } from '@/config/config.default';
import { systemConfig } from '@/config';
import { userNameSelect } from '@/services/system';
import { Request, Response, NextFunction } from 'express';
import { sendMes } from '@/utils/sendMes';
const { CODE_ERROR, CODE_SUCCESS } = systemConfig;

const userName =async (req: Request, res: Response, next: NextFunction) => {
  console.log('99999 :>> ', 99999);
  const { user } = req.body;
  console.log('user :>> ', user);
  console.log('req.body :>> ', req.body);
  const data: any = await querySql(userNameSelect(user));
  res.json(sendMes(CODE_SUCCESS, 'success', data))
};
export { userName };