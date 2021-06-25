// 登录接口的查询
export const logSelect = (user: string, pwd: string) => {
  return `select * from sys_user where username='${user}' and password='${pwd}'`
}

// 注册接口的插入
export const regInsert = (user: string, pwd: string) => {
  return `insert into sys_user(username, password, nickname ,email) values('${user}', '${pwd}','wz', 'email')`
}

// 注册账户的查询
export const regSelect = (user: string) => {
  return `select id, username from sys_user where username='${user}'`
}