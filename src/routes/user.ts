/*
 * @Author: zz
 * @Date: 2021-06-28 16:37:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-09 16:01:58
 */
import express from 'express';
import { validateUserLogin } from '@/middleware/user';
import { login, register, userList } from '@/controllers/user';
import { userNameSel, userNameDel } from '@/controllers/system';

const router = express.Router();

// 用户登录路由
router.post('/login', validateUserLogin, login);

// 用户注册路由
router.post('/register', validateUserLogin, register);

// 用户列表
router.post('/userList', userList);

// 用户信息查询
router.post('/sysUserList', userNameSel);

// 用户信息的删除
router.post('/sysUserDel', userNameDel);

export default router;
