export const logSelect = (user: string, pwd: string) => {
  return `select * from sys_user where username='${user}' and password='${pwd}'`
}

export const regInsert = (user: string, pwd: string) => {
  return `insert into sys_user(username, password, nickname ,email) values('${user}', '${pwd}','wz', 'email')`
}

export const regSelect = (user: string) => {
  return `select id, username from sys_user where username='${user}'`
}