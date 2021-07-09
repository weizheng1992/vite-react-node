/*
 * @Author: zz
 * @Date: 2021-06-29 20:30:01
 * @LastEditors: zz
 * @LastEditTime: 2021-07-08 16:28:26
 */

import { querySql } from '@/config/config.default';
import { systemConfig } from '@/config';
import { userNameSelect } from '@/services/system';
import { Request, Response, NextFunction } from 'express';
import { sendMes } from '@/utils/sendMes';
const { CODE_ERROR, CODE_SUCCESS } = systemConfig;

const userName = async (req: Request, res: Response, next: NextFunction) => {
  // const { size, page, names } = req.body;
  // console.log('req.body :>> ', size, page);
  // const params = { size, page, names };
  const data: any = await querySql(userNameSelect(req.body));
  res.json(sendMes(CODE_SUCCESS, 'success', data));
};
export { userName };
