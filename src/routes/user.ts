import express from 'express';
import { validateUserLogin, validateUserReg } from '@/middleware/user';
import { login, register } from '@/controllers/user';

const router = express.Router();

// 用户登录路由
router.post('/login', validateUserLogin, login);

// 用户注册路由
router.post('/register', validateUserReg, register);

export default router;