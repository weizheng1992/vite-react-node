export interface MenuItem {
  menuId: string;
  name: string;
  url: string;
  icon: number;
  perms?: string;
  orderNum: number;
  children?: MenuItem[];
}
