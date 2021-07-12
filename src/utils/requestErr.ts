/*
 * @Author: weizheng
 * @Date: 2021-06-29 17:30:45
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-08 16:20:56
 */
import { validationResult, ValidationError } from 'express-validator';
import { sendMes } from '@/utils/sendMes';
import { Request, Response } from 'express';
import { systemConfig } from '@/config';
const { CODE_ERROR } = systemConfig;

export function requestErr(req: Request, res: Response) {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${msg}`;
  };
  const err: any = validationResult(req).formatWith(errorFormatter);
  console.log('err', err);
  if (!err.isEmpty()) {
    res.json(sendMes(CODE_ERROR, err.array().join(',')));
    return;
  }
}
