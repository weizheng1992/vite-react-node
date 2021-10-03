import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Menus extends BaseEntity {
  @PrimaryColumn('int', { generated: false })
  id!: number;

  @Column({ type: 'int', name: 'parent_id' })
  parentId!: number;

  @Column('varchar', { length: 20 })
  name!: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  url!: string;

  // 授权(多个用逗号分隔，如：user:list,user:create)'
  @Column({ type: 'varchar', length: 50, nullable: true })
  perms!: string;

  // 0：目录   1：菜单   2：按钮',
  @Column('int')
  type!: number;

  @Column()
  icon!: string;

  @Column('int')
  sort!: number;
}
