import { decode } from '@/utils/user-jwt';
import jwt from 'jsonwebtoken';
import { systemConfig } from '@/config';
import { queryUser, insertUser } from '@/sqls/user';
import { UserInfo, UserParams } from '@/sqls/user/model/searchModel';

import { Request, Response } from 'express';

const { CODE_ERROR, CODE_SUCCESS, PRIVATE_KEY, JWT_EXPIRED } = systemConfig;

export const login = async (req: Request, res: Response) => {
  const user: UserInfo[] = await queryUser(req.body);
  console.log('user :>> ', user);
  // if(user.length===0){
  //   res.json(sendMes(CODE_ERROR, '账户不存在',{}))
  // }
  // if()
  // if(user)

  // console.log('用户登录===', user);
  // if (!user || user.length === 0) {
  //   res.json({
  //     code: CODE_ERROR,
  //     msg: '用户名或密码错误',
  //     data: null,
  //   });
  // } else {
  //   userInfoAndToken(req.body, user, res);
  // }
};

export const register = async (req: Request, res: Response) => {
  const result: any = insertUser(req.body);
  if (!result || result.length === 0) {
    res.json({
      code: CODE_ERROR,
      msg: '注册失败',
      data: null,
    });
  } else {
    const user: UserInfo[] = await queryUser(req.body);
    userInfoAndToken(req.body, user, res);
  }
};

function userInfoAndToken(body: UserParams, user: UserInfo[], res: Response) {
  // 登录成功，签发一个token并返回给前端
  const { username } = body;
  const token = jwt.sign(
    // payload：签发的 token 里面要包含的一些数据。
    { username },
    // 私钥
    PRIVATE_KEY,
    // 设置过期时间
    { expiresIn: JWT_EXPIRED }
  );

  const userData = {
    id: user[0].id,
    username: user[0].username,
    nickname: user[0].nickname,
    avator: user[0].avator,
    sex: user[0].sex,
    gmt_create: user[0].gmt_create,
    gmt_modify: user[0].gmt_modify,
  };

  res.json({
    code: CODE_SUCCESS,
    msg: '登录成功',
    data: {
      token,
      userData,
    },
  });
}
