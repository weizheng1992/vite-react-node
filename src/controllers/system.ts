/*
 * @Author: zz
 * @Date: 2021-06-29 20:30:01
 * @LastEditors: zz
 * @LastEditTime: 2021-07-02 15:26:47
 */

import { querySql } from '@/config/config.default';
import { systemConfig } from '@/config';
import { userNameSelect } from '@/services/system';
import { Request, Response, NextFunction } from 'express';
import { sendMes } from '@/utils/sendMes';
const { CODE_ERROR, CODE_SUCCESS } = systemConfig;

const userName = async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body;
  const data: any = await querySql(userNameSelect(user));
  res.json(sendMes(CODE_SUCCESS, 'success', data));
};
export { userName };