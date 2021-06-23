import app from './app';

import { systemConfig } from './config';

import { getEnvConfig } from './utils/envConfig';
console.log('111111111111111', process.env.NODE_ENV);
getEnvConfig([`.env.${process.env.NODE_ENV}`]);
console.log('__________________', process.env.MYSQL_PWD);

const server = app.listen(systemConfig.PORT, function () {
  console.log(`server is listening at port ${systemConfig.PORT}`);
});

export default server;
