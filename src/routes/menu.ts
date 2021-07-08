/*
 * @Author: weizheng
 * @Date: 2021-07-08 17:05:48
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-08 17:08:08
 */
import express from 'express';
import { validateUserLogin } from '@/middleware/user';

const router = express.Router();

router.post('/list');

export default router;