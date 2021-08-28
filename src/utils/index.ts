/*
 * @Author: weizheng
 * @Date: 2021-07-08 16:30:48
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 17:19:39
 */
interface TreeHelperConfig {
  id: string;
  children: string;
  pid: string;
}
const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'menuId',
  children: 'children',
  pid: 'parentId',
};

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);

// tree from list
export function listToTree<T = any>(list: any[], config: Partial<TreeHelperConfig> = {}): T[] {
  const conf = getConfig(config) as TreeHelperConfig;
  const nodeMap = new Map();
  const result: T[] = [];
  const { id, children, pid } = conf;

  for (const node of list) {
    node[children] = node[children] || [];
    nodeMap.set(node[id], node);
  }
  for (const node of list) {
    const parent = nodeMap.get(node[pid]);
    (parent ? parent.children : result).push(node);
  }
  return result;
}

// 下划线转驼峰
export function toHumpFun(obj: any) {
  const result: any = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      const index = key.indexOf('_');
      let newKey = key;
      if (index === -1 || key.length === 1) {
        result[key] = element;
      } else {
        const keyArr = key.split('_');
        const newKeyArr = keyArr.map((item, index) => {
          if (index === 0) return item;
          return item.charAt(0).toLocaleUpperCase() + item.slice(1);
        });
        newKey = newKeyArr.join('');
        result[newKey] = element;
      }

      if (typeof element === 'object' && element !== null) {
        result[newKey] = toHumpFun(element);
      }
    }
  }
  return result;
}

