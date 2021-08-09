/*
 * @Author: weizheng
 * @Date: 2021-07-08 17:05:48
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-12 18:01:58
 */
import express from 'express';
import { menus, updateMenu } from '@/controllers/sys/menu';

const router = express.Router();

router.post('/menu/list', menus);
router.post('/menu/update', updateMenu);

export default router;
