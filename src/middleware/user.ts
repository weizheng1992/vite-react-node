import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { systemConfig } from '@/config';
import { findUser } from '@/sqls/user';
import { UserInfo } from '@/sqls/user/model/searchModel';
const { CODE_ERROR } = systemConfig;

export async function validateUserLogin(req: Request, res: Response, next: NextFunction) {
  await check('username', 'username 不能为空').not().isEmpty().run(req);
  await check('password', 'username 不能为空').not().isEmpty().run(req);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.json({
      code: CODE_ERROR,
      msg: errors.array().join(' '),
      data: null,
    });
  } else {
    next();
  }
}

export async function validateUserReg(req: Request, res: Response, next: NextFunction) {
  await check('username', 'username 不能为空').not().isEmpty().run(req);
  await check('password', 'username 不能为空').not().isEmpty().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json({
      code: CODE_ERROR,
      msg: errors.array().join(' '),
      data: null,
    });
  } else {
    const { username } = req.body;
    const data: UserInfo = await findUser(username);
    if (data) {
      res.json({
        code: CODE_ERROR,
        msg: '用户已存在',
        data: null,
      });
    } else {
      next();
    }
  }
}
