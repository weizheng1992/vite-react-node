/*
 * @Author: zz
 * @Date: 2021-06-28 16:37:28
 * @LastEditors: zz
 * @LastEditTime: 2021-06-29 20:37:59
 */
import express from 'express';
import { validateUserLogin } from '@/middleware/user';
// import { login, register } from '@/controllers/user';
import { body } from 'express-validator';
import { login, register } from '@/controllers/user';
import { userName } from '@/controllers/system';

const router = express.Router();

// 登录/注册校验
const vaildator = [
  body('username').notEmpty().withMessage('用户名不能为空').isLength({ min: 3 }).withMessage('用户名最少3个字符'),
  body('password').notEmpty().withMessage('密码类型不正确').isLength({ min: 3 }).withMessage('密码最少3个字符'),
];

const vai: any = []

// 用户登录路由
router.post('/login', validateUserLogin, login);

// 用户注册路由
router.post('/register', validateUserLogin, register);

// 用户信息查询
router.get('/userinfo', vai, userName);

export default router;
