import jwt from 'jsonwebtoken';
import { validationResult, ValidationError } from 'express-validator';
import { querySql, queryOne } from '@/utils/index';
import { Md5 as md5 } from '@/utils/md5';
import { systemConfig } from '@/config';

import { Request, Response, NextFunction } from 'express';

const { CODE_ERROR, CODE_SUCCESS, PRIVATE_KEY, JWT_EXPIRED } = systemConfig;
// 登录
function login(req: Request, res: Response, next: NextFunction) {
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
    res.json({
      code: CODE_ERROR,
      msg: err.array().join(','),
      data: null,
    });
  } else {
    let { username, password } = req.body;
    // md5加密
    password = md5(password);
    const query = `select * from sys_user where username='${username}' and password='${password}'`;
    querySql(query).then((user: any) => {
      // console.log('用户登录===', user);
      if (!user || user.length === 0) {
        res.json({
          code: CODE_ERROR,
          msg: '用户名或密码错误',
          data: null,
        });
      } else {
        // 登录成功，签发一个token并返回给前端
        const token = jwt.sign(
          // payload：签发的 token 里面要包含的一些数据。
          { username },
          // 私钥
          PRIVATE_KEY,
          // 设置过期时间
          { expiresIn: JWT_EXPIRED }
        );

        res.json({
          code: CODE_SUCCESS,
          msg: '登录成功',
          data: {
            token,
            userId: user[0].id,
          },
        });
      }
    });
  }
}

// 注册
function register(req: Request, res: Response, next: NextFunction) {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${msg}`;
  };

  const err: any = validationResult(req).formatWith(errorFormatter);
  if (!err.isEmpty()) {
    // const [{ msg }] = err.errors;
    // next(boom.badRequest(msg));
    res.json({
      code: CODE_ERROR,
      msg: err.array().join(','),
      data: null,
    });
  } else {
    let { username, password } = req.body;
    findUser(username).then((data) => {
      // console.log('用户注册===', data);
      if (data) {
        res.json({
          code: CODE_ERROR,
          msg: '用户已存在',
          data: null,
        });
      } else {
        password = md5(password);
        const query = `insert into sys_user(username, password, nickname ,email) values('${username}', '${password}','wz', 'email')`;
        querySql(query).then((result: any) => {
          // console.log('用户注册===', result);
          if (!result || result.length === 0) {
            res.json({
              code: CODE_ERROR,
              msg: '注册失败',
              data: null,
            });
          } else {
            const queryUser = `select * from sys_user where username='${username}' and password='${password}'`;
            querySql(queryUser).then((user: any) => {
              const token = jwt.sign({ username }, PRIVATE_KEY, { expiresIn: JWT_EXPIRED });

              res.json({
                code: CODE_SUCCESS,
                msg: '注册成功',
                data: {
                  token,
                  userId: user[0].id,
                },
              });
            });
          }
        });
      }
    });
  }
}

// 通过用户名查询用户信息
function findUser(username: string) {
  const query = `select id, username from sys_user where username='${username}'`;
  return queryOne(query);
}

export { login, register };
