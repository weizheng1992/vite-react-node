import md5 from 'crypto-js/md5';

function Md5(s: string): string {
  const str: string = md5(s).toString();
  return str;
}
export { Md5 };
