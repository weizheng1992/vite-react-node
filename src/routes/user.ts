/*
 * @Author: zz
 * @Date: 2021-06-28 16:37:28
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-08 17:24:18
 */
import express from 'express';
import { validateUserLogin } from '@/middleware/user';
import { login, register, userList } from '@/controllers/user';
import { userName } from '@/controllers/system';

const router = express.Router();

// 用户登录路由
router.post('/login', validateUserLogin, login);

// 用户注册路由
router.post('/register', validateUserLogin, register);

// 用户列表
router.post('/userList', userList);

// 用户信息查询
router.post('/sysUserList', userName);

export default router;
