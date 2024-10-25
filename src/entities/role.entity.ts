import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';


export enum RoleEnum {
    Admin = 'admin',
    Manager = 'project manager',
    Engineer = 'engineer',
}


@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    unique: true
  })
  roleName: RoleEnum;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[];
}
