import jwt from 'jsonwebtoken';
import { validationResult, ValidationError } from 'express-validator';
import { querySql, queryOne } from '@/utils/index';
import { Md5 as md5 } from '@/utils/md5';
import { systemConfig } from '@/config';
import { sendMes } from '@/utils/sendMes';
import { logSelect, regSelect, regInsert } from '@/services/user';
import { Request, Response, NextFunction } from 'express';

const { CODE_ERROR, CODE_SUCCESS, PRIVATE_KEY, JWT_EXPIRED } = systemConfig;

// 登录
const login = async (req: Request, res: Response, next: NextFunction) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${msg}`;
  };
  const err: any = validationResult(req).formatWith(errorFormatter);
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
  // const query = `select * from sys_user where username='${username}' and password='${password}'`;
  const user: any = await querySql(logSelect(username, password));
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
  const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${msg}`;
  };
  const err: any = validationResult(req).formatWith(errorFormatter);
  if (!err.isEmpty()) {
    res.json(sendMes(CODE_ERROR, err.array().join(',')))
    return
  }
  let { username, password } = req.body;
  // 查询用户注册
  const data = await queryOne(regSelect(username))
  if(data){
    res.json(sendMes(CODE_ERROR, '用户已存在'));
    return
  }
  password = md5(password);
  const user:any = await querySql(regInsert(username,password))
  const token = jwt.sign({ username }, PRIVATE_KEY, { expiresIn: JWT_EXPIRED });
  res.json(sendMes(CODE_SUCCESS, '注册成功', { token, userId: user[0].id }))
}

export { login, register };
