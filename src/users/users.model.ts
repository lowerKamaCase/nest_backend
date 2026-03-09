import { ApiProperty } from '@nestjs/swagger';
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from 'src/posts/posts.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttributes {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: 1, description: 'Идентификатор' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 'email.email.com', description: 'Электронная почта' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @ApiProperty({ example: 'password', description: 'Пароль' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  declare password: string;

  @ApiProperty({ example: true, description: 'Флаг - забанен ли пользователь' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare banned: boolean;

  @ApiProperty({ example: 'Плохо вел себя', description: 'Причина бана' })
  @Column({ type: DataType.STRING, allowNull: true })
  declare banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  declare roles: Role[];

  @HasMany(() => Post)
  posts: Post[];
}
