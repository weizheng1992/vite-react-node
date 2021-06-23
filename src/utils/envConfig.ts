import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
export function getEnvConfig(confFiles = ['.env', '.env.production']) {
  let envConfig: any = {};
  confFiles.forEach((item) => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));

  console.log('^^^^^^^^^^^^^^^^^^^', item);
      envConfig = { ...envConfig, ...env };
    } catch (error) {}
  });
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
  // Object.keys(envConfig).forEach((key) => {
  //   const reg = new RegExp(`^(${match})`);
  //   if (!reg.test(key)) {
  //     Reflect.deleteProperty(envConfig, key);
  //   }
  // });
  return envConfig;
}
