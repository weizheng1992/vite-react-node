/*
 * @Author: weizheng
 * @Date: 2021-06-29 19:28:35
 * @LastEditors: weizheng
 * @LastEditTime: 2021-06-29 19:41:45
 */
import { buildSchema } from 'graphql';

const schema = buildSchema(`
type Query {
  hello: String
}
`);
export { schema };
