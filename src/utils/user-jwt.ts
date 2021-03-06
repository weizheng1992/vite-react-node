/*
 * @Author: zz
 * @Date: 2021-07-02 15:08:13
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-21 22:00:32
 */
import jwt from 'jsonwebtoken'; // 引入验证jsonwebtoken模块
import expressJwt from 'express-jwt'; // 引入express-jwt模块
import { systemConfig } from '../config';

// 验证token是否过期
const jwtAuth = expressJwt({
  algorithms: ['HS256'],
  // 设置密钥
  secret: systemConfig.PRIVATE_KEY,
  // 设置为true表示校验，false表示不校验
  credentialsRequired: true,
  // 自定义获取token的函数
  getToken: (req: any) => {
    if (req.headers.authorization) {
      return req.headers.authorization;
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null
  },
  // 设置jwt认证白名单，比如/api/login登录接口不需要拦截
});
// .unless({
//   path: ['/', '/api/login', '/api/register'],
// });

// jwt-token解析
function decode(token: string | undefined) {
  if (!token) {
    return null;
  }
  return jwt.verify(token, systemConfig.PRIVATE_KEY);
}

export { jwtAuth, decode };
