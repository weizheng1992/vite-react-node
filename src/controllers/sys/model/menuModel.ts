export interface MenuItem {
  menuId: string;
  name: string;
  url: string;
  icon: string;
  perms?: string;
  orderNum: number;
  children?: MenuItem[];
}

export interface MenuDel {
  menuId: string;
}
