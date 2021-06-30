/*
 * @Author: weizheng
 * @Date: 2021-06-29 19:28:35
 * @LastEditors: weizheng
 * @LastEditTime: 2021-06-30 11:08:22
 */
import { buildSchema } from 'graphql';

const schema = buildSchema(`
type Query {
  hello: String
}
`);
const schemaObj = buildSchema(`
type Query {
  username: String
}
`);
export { schema, schemaObj };
