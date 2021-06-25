import express from 'express';
import { validateUserLogin, validateUserReg } from '@/middleware/user';
// import { login, register } from '@/controllers/user';
import { body } from 'express-validator';
import { login, register } from '@/controllers/user';

const router = express.Router();

// 登录/注册校验
const vaildator = [
  body('username').notEmpty().withMessage('用户名不能为空').isLength({ min: 3 }).withMessage('用户名最少3个字符'),
  body('password').notEmpty().withMessage('密码类型不正确').isLength({ min: 3 }).withMessage('密码最少3个字符'),
];

// 用户登录路由
router.post('/login', vaildator, login);
 
// 用户注册路由
router.post('/register', vaildator, register);

export default router;
