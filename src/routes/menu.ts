/*
 * @Author: weizheng
 * @Date: 2021-07-08 17:05:48
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-12 18:01:58
 */
import express from 'express';
import { menus } from '@/controllers/sys/menu';

const router = express.Router();

router.post('/menu/list', menus);

export default router;
