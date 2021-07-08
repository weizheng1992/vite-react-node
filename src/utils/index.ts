/*
 * @Author: weizheng
 * @Date: 2021-07-08 16:30:48
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-08 16:47:48
 */
import { remove } from 'lodash-es';

/**
 * @name: weizheng
 * @desc: 数组转数
 * @param {any} arr
 * @param {*} pid
 * @param {*} id
 * @return {*}
 */
const arrToTree = (arr: any[], pid = 'parentId', id = 'id') => {
  const tree: any[] = [];
  remove(arr, (item) => {
    if (item[pid] === '0') {
      tree.push(item);
      return true;
    }
    return false;
  });
  // 递归
  const getChildren = (arr: any[], tree: any[], pid: string, id: string) => {
    if (!arr || !tree) return;
    tree.forEach((i) => {
      remove(arr, (j) => {
        if (j[pid] === i[id]) {
          i.children.push(j);
          return true;
        }
        return false;
      });
      if (i.children.length === 0) {
        delete i.children;
      } else {
        getChildren(arr, i.children, pid, id);
      }
    });
  };
  getChildren(arr, tree, pid, id);
  return tree;
};

export { arrToTree };
