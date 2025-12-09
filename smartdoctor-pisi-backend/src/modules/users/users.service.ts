import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async create(data: any) {
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user);
  }

  async findByEmail(email: string) {
    return this.usersRepo.findOne({
      where: { email },
      select: ['id', 'email', 'password_hash', 'name', 'role', 'clinic_id'],
    });
  }

  async findById(id: string) {
    return this.usersRepo.findOne({ where: { id } });
  }
}
