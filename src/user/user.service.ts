import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userRepo.create(createUserDto);
      await this.userRepo.save(newUser);
      return newUser;
    } catch (error) {
      if (error['code'].includes('ER_DUP_ENTRY')) {
        return { status: 'fail', message: 'User already exist!' };
      }
    }
  }

  async findAll() {
    try {
      const allUsers = await this.userRepo.find({
        select: ['id', 'email', 'firstname', 'lastname', 'createdAt'],
      });
      return allUsers;
    } catch (error) {
      throw new NotFoundException('No user found');
    }
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      select: ['id', 'email', 'firstname', 'lastname', 'createdAt'],
    });
    if (user) return user;
    throw new NotFoundException('Could not find the user');
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = { id, updateUserDto };
    await this.userRepo.update({ id: id }, updateUser);
    const updatedUser = await this.userRepo.findOne({
      where: {
        id: updateUser.id,
      },
      select: ['id', 'email', 'firstname', 'lastname', 'createdAt'],
    });
    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!user) return null;
    await this.userRepo.remove(user);
    return user;
  }
}
