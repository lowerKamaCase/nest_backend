import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RoleService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    const role = await this.roleService.getRoleByValue('USER');

    if (role?.id) {
      user.$set('roles', [role.id]);
    }

    return user;
  }

  async getAllUsers() {
    return this.userRepository.findAll({ include: { all: true } });
  }
}
