import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from './role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  resource: string; // For example: 'user' or 'project'

  @Column({ default: false })
  canView: boolean;

  @Column({ default: false })
  canEdit: boolean;

  @Column({ default: false })
  canDelete: boolean;

  @ManyToOne(() => Role, (role) => role.permissions, { onDelete: 'CASCADE' })
  role: Role;
}
