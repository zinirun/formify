import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { UserAuthDto } from './user.auth.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    private async createUser(userAuth: UserAuthDto): Promise<User> {
        const user = this.userRepository.create(userAuth);
        return this.userRepository.save(user);
    }

    public async findOne(where: FindConditions<User>): Promise<User> {
        return await this.userRepository.findOneOrFail({ where });
    }

    public async findOrCreate(userAuth: UserAuthDto): Promise<User> {
        try {
            const { provider, providerId } = userAuth;
            return await this.findOne({ provider, providerId });
        } catch {
            return await this.createUser(userAuth);
        }
    }
}
