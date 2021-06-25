import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { systemConfig } from '@/config';
import { findUser } from '@/sqls/user';
import { UserInfo } from '@/sqls/user/model/searchModel';
import { sendMes } from '@/utils/sendMes';
const { CODE_ERROR } = systemConfig;

export async function validateUserLogin(req: Request, res: Response, next: NextFunction) {
  await check('username', '账户不能为空').not().isEmpty().run(req);
  await check('password', '密码不能为空').not().isEmpty().run(req);
  const errors = validationResult(req);
  if(!errors.array().length){
    next();
    return
  }
  if(!errors.array()[0].value){
    res.json(sendMes(CODE_ERROR, errors.array()[0].msg))
    return
  }
  if(!errors.array()[0].value){
    res.json(sendMes(CODE_ERROR, errors.array()[1].msg))
    return
  }
}

export async function validateUserReg(req: Request, res: Response, next: NextFunction) {
  await check('username', 'username 不能为空').not().isEmpty().run(req);
  await check('password', 'username 不能为空').not().isEmpty().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json(sendMes(CODE_ERROR, errors.array().join(' ')))
    return
  }
  const { username } = req.body;
  const data: UserInfo = await findUser(username);
  if (data) {
    res.json(sendMes(CODE_ERROR, '用户已存在'))
    return
  }
  next();
}
