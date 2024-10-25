import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity('user_roles')
export class UserRole {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  roleId: number;

  @ManyToOne(() => User, (user) => user.roles, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Role, (role) => role.users, { onDelete: 'CASCADE' })
  role: Role;
}
