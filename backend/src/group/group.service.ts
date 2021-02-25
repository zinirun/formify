import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { GroupInput } from './group.input';

@Injectable()
export class GroupService {
    constructor(@InjectRepository(Group) private groupRepository: Repository<Group>) {}

    private async getOne(id: number): Promise<Group> {
        const group = await this.groupRepository.findOne(id);
        if (!group) {
            throw new NotFoundException(`Group with ID ${id}: Not Found`);
        }
        return group;
    }

    async getAll(user: User): Promise<Group[]> {
        return await this.groupRepository.find({
            where: {
                user: user.id,
            },
        });
    }

    async create(user: User, group: GroupInput): Promise<Group> {
        try {
            const { id } = await this.groupRepository.save({ ...group, user });
            return await this.getOne(id);
        } catch (err) {
            throw new ConflictException(err);
        }
    }
}
