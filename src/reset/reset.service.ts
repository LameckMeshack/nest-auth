import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reset } from './models/reset.entity';
import { Repository } from 'typeorm';
import { ResetDto } from './dto/reset.do';

@Injectable()
export class ResetService {
    constructor(
        @InjectRepository(Reset) private readonly resetReposiory: Repository<Reset>
    ) { }

    async create(reset: ResetDto): Promise<Reset> {
        return await this.resetReposiory.save(reset)
    }
}