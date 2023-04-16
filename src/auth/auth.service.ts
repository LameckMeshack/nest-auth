import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';
import { RegUserDto } from './models/reg-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>) { }

    async create(user: RegUserDto): Promise<User> {
        return await this.userRepository.save(user);
    }

}
