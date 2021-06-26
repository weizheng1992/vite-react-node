import { resolve } from 'path';
import mysql from 'mysql';
//连接mysql
function connect() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE,
  });
}

//新建查询连接
function querySql(sql: string) {
  const conn = connect();
  // console.log('conn :>> ', conn);
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

// 插入一条语句
function insertOne(sql: string) {
  return new Promise((resolve, reject) => {

  })
}

export { querySql, queryOne };
