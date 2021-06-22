import app from './app';

import { systemConfig } from './config';

const server = app.listen(systemConfig.PORT, function() {
  console.log(`server is listening at port ${systemConfig.PORT}`);
});

export default server;
