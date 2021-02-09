import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    private async createUser(
        provider: string,
        providerId: string,
        username = 'Anonymous',
    ): Promise<User> {
        const user = this.userRepository.create({
            provider,
            providerId,
            username,
        });
        return this.userRepository.save(user);
    }

    public async findOne(where: FindConditions<User>): Promise<User> {
        return await this.userRepository.findOneOrFail({ where });
    }

    public async findOrCreate(
        provider: string,
        providerId: string,
        username: string,
    ): Promise<User> {
        try {
            return await this.findOne({ provider, providerId });
        } catch {
            return await this.createUser(provider, providerId, username);
        }
    }
}
