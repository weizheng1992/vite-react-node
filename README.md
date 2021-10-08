## 准备
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Typerom](https://typeorm.biunav.com/zh/) - 数据库链接和创建表
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme) - 加密
- [graphql](https://graphql.cn/) - gql 语法

## 配置 
 - Typerom

 ```bash
  createConnection({
    type: 'mysql', // mysql数据库
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'my_test', //database
    synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.ts'],// 实体类地址
  })
```

## 前端

- [git地址](https://github.com/weizheng1992/vite-ts-react) - react ts graphql

## 部署 

- [git地址](https://github.com/weizheng1992/react-webhook) - webhook 
