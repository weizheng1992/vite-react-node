import app from './app';


import { getEnvConfig } from './utils/envConfig';
console.log('111111111111111', process.env.NODE_ENV);
getEnvConfig([`.env.${process.env.NODE_ENV}`]);
console.log('__________________', process.env.MYSQL_PWD);

import { systemConfig } from './config';
const server = app.listen(systemConfig.PORT, function () {
  console.log(`server is listening at port ${systemConfig.PORT}`);
});

export default server;
