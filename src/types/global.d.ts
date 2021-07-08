/*
 * @Author: weizheng
 * @Date: 2021-06-18 11:11:01
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-08 16:37:58
 */
declare type Recordable<T extends any = any> = Record<
  string,
  T
>

declare type Indexable<T extends any = any> = {
  [key: string]: T
}


declare type Nullable<T> = T | null;
declare type NonNullable<T> = T extends null | undefined ? never : T;