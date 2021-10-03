/*
 * @Author: your name
 * @Date: 2021-06-28 19:17:44
 * @LastEditTime: 2021-06-30 11:44:42
 * @LastEditors: weizheng
 * @Description: In User Settings Edit
 * @FilePath: /react+node/vite-react-node/src/config/config.default.ts
 */
import { resolve } from 'path';
import mysql from 'mysql';
import { camelizeKeys } from 'humps';
//连接mysql
const connection = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE,
  });
};

// connection()

// const conns = mysql.createConnection({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PWD,
//       database: process.env.DB_DATABASE,
//     });

//新建查询连接
export function querySql<T = any>(sql: string): Promise<T> {
  const conn = connection();
  // const conn = conns.connect();
  // console.log('conn :>> ', conn);
  return new Promise((resolve, reject) => {
    try {
      conn.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(camelizeKeys(res));
        }
      });
    } catch (e) {
      reject(e);
    } finally {
      //释放连接
      conn.end();
    }
  });
};

//查询一条语句
export function queryOne<T = any>(sql: string): Promise<T> {
  return new Promise((resolve, reject) => {
    querySql<T>(sql)
      .then((res: any) => {
        console.log('res===', res);
        if (res && res.length > 0) {
          resolve(camelizeKeys(res[0]));
        } else {
          resolve(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// // 插入一条语句
// function insertOne(sql: string) {
//   return new Promise((resolve, reject) => {

//   })
// }
