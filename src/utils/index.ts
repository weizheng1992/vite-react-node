import mysql from 'mysql';
import { dbConfig } from '../config';

//连接mysql
function connect() {
  const { host, user, password, database } = dbConfig;
  console.log('***********', dbConfig);
  return mysql.createConnection({
    host,
    user,
    password,
    database,
  });
}

//新建查询连接
function querySql(sql: string) {
  const conn = connect();
  return new Promise((resolve, reject) => {
    try {
      conn.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    } catch (e) {
      reject(e);
    } finally {
      //释放连接
      conn.end();
    }
  });
}

//查询一条语句
function queryOne(sql: string) {
  return new Promise((resolve, reject) => {
    querySql(sql)
      .then((res: any) => {
        console.log('res===', res);
        if (res && res.length > 0) {
          resolve(res[0]);
        } else {
          resolve(null);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { querySql, queryOne };
