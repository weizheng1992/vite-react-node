/*
 * @Author: weizheng
 * @Date: 2021-06-30 11:09:57
 * @LastEditors: weizheng
 * @LastEditTime: 2021-06-30 11:35:46
 */

import { querySql } from '@/config/config.default';
import { regSelect } from '@/services/user';
const resolvers = {
  Query: {
    async getUser(parent, args, context, info) {
      return await querySql(regSelect(args.username));
    },
  },
};

export { resolvers };
