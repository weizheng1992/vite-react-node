/*
 * @Author: your name
 * @Date: 2021-06-28 16:37:28
 * @LastEditTime: 2021-07-08 16:22:47
 * @LastEditors: weizheng
 * @Description: In User Settings Edit
 * @FilePath: /react+node/vite-react-node/src/middleware/user.ts
 */
import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { systemConfig } from '@/config';
// import { findUser } from '@/sqls/user';
// import { UserInfo } from '@/sqls/user/model/searchModel';
import { sendMes } from '@/utils/sendMes';
import { requestErr } from '@/utils/requestErr';
const { CODE_ERROR } = systemConfig;

// 登录/注册校验
// const vaildator = [
//   body('username')
//     .notEmpty()
//     .withMessage('用户名不能为空')
//     .isLength({ min: 3 })
//     .withMessage('用户名最少3个字符'),
//   body('password')
//     .notEmpty()
//     .withMessage('密码类型不正确')
//     .isLength({ min: 3 })
//     .withMessage('密码最少3个字符'),
// ];

export async function validateUserLogin(req: Request, res: Response, next: NextFunction) {
  await check('username', '账户不能为空').not().isEmpty().isLength({ min: 3 }).run(req);
  await check('password', '密码不能为空').not().isEmpty().run(req);
  requestErr(req, res);
  next();
}

export async function validateUserReg(req: Request, res: Response, next: NextFunction) {
  await check('username', 'username 不能为空').not().isEmpty().run(req);
  await check('password', 'username 不能为空').not().isEmpty().run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.json(sendMes(CODE_ERROR, errors.array().join(' ')));
    return;
  }
  const { username } = req.body;
  // const data: UserInfo = await findUser(username);
  // if (data) {
  //   res.json(sendMes(CODE_ERROR, '用户已存在'))
  //   return
  // }
  next();
}
