import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RoleService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);

    const role = await this.roleService.getRoleByValue('ADMIN');

    if (role?.id) {
      user.$set('roles', [role.id]);
      user.roles = [role];
    }

    return user;
  }

  async getAllUsers() {
    return this.userRepository.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email }, include: { all: true } });
  }

  async addRole(roleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(roleDto.userId);
    const role = await this.roleService.getRoleByValue(roleDto.value);

    if (role && user) {
      user.$add('role', role.id);
      return roleDto;
    }

    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    user.banned = true;
    user.banReason = dto.banReason;

    await user.save();
    return user;
  }
}
