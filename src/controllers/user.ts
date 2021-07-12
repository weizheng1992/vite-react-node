/*
 * @Author: weizheng
 * @Date: 2021-06-29 18:51:23
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-08 17:05:02
 */
import jwt from 'jsonwebtoken';
import { validationResult, ValidationError } from 'express-validator';
import { querySql, queryOne } from '@/config/config.default';
import { Md5 as md5 } from '@/utils/md5';
import { systemConfig } from '@/config';
import { sendMes } from '@/utils/sendMes';
import { requestErr } from '@/utils/requestErr';
import { logSelect, regSelect, regInsert, userListSelect } from '@/services/user';
import { Request, Response, NextFunction } from 'express';
import { countSelect } from '@/services/common';
import { UserInfo } from '@/controllers/model/userModel';

const { CODE_ERROR, CODE_SUCCESS, PRIVATE_KEY, JWT_EXPIRED } = systemConfig;

// 登录
const login = async (req: Request, res: Response, next: NextFunction) => {
  console.log('1 :>> ', 1);
  const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${msg}`;
  };
  const err = validationResult(req).formatWith(errorFormatter);
  // 如果验证错误，empty不为空
  if (!err.isEmpty()) {
    // 获取错误信息
    // 抛出错误，交给我们自定义的统一异常处理程序进行错误返回
    // return res.json({ errors: err.array() });
    res.json(sendMes(CODE_ERROR, err.array().join(',')));
    return;
  }
  let { username, password } = req.body;
  // md5加密
  password = md5(password);
  const user: UserInfo[] = await querySql<UserInfo[]>(regSelect(username));
  // 判断账户
  if (user.length === 0) {
    res.json(sendMes(CODE_ERROR, '账户不存在!'));
    return;
  }
  // 判断密码
  if (user[0].password !== password) {
    res.json(sendMes(CODE_ERROR, '密码不正确!'));
    return;
  }
  // 登陆成功
  const token = jwt.sign({ username }, PRIVATE_KEY, { expiresIn: JWT_EXPIRED });
  res.json(
    sendMes(CODE_SUCCESS, '登录成功!', {
      token,
      userId: user[0].id,
    })
  );
};

// 注册
const register = async (req: Request, res: Response, next: NextFunction) => {
  console.log('2 :>> ', 2);
  const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${msg}`;
  };
  const err = validationResult(req).formatWith(errorFormatter);
  if (!err.isEmpty()) {
    res.json(sendMes(CODE_ERROR, err.array().join(',')));
    return;
  }
  let { username, password } = req.body;
  // // 查询用户注册
  const data: UserInfo[] = await querySql<UserInfo[]>(regSelect(username));
  if (data.length > 0) {
    res.json(sendMes(CODE_ERROR, '用户已存在'));
    return;
  }
  password = md5(password);
  const registerRes: any = await querySql(regInsert(username, password));
  if (registerRes.affectedRows === 1) {
    res.json(sendMes(CODE_SUCCESS, '注册成功'));
    // 注册完之后登录
    login(req, res, next);
  }
  res.json(sendMes(CODE_ERROR, '服务器故障，注册失败'));
};

const userList = async (req: Request, res: Response, next: NextFunction) => {
  requestErr(req, res);
  const { page, size } = req.body;
  console.log(page, size);
  const user: UserInfo[] = await querySql<UserInfo[]>(userListSelect(page, size));
  const count: { count: number } = await queryOne<{ count: number }>(countSelect('sys_user'));
  const data = {
    items: user,
    total: count.count,
  };
  res.json(sendMes(CODE_SUCCESS, '查询成功!', data));
};

export { login, register, userList };
