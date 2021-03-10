import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { GroupInput } from './group.input';

@Injectable()
export class GroupService {
    constructor(@InjectRepository(Group) private groupRepository: Repository<Group>) {}

    async getOne(id: number, user: User): Promise<Group> {
        const group = await this.groupRepository.findOne(id, {
            where: {
                userId: user.id,
                isDeleted: false,
            },
        });
        if (!group) {
            throw new NotFoundException(`Group with ID ${id}: Not Found`);
        }
        return group;
    }

    async getAll(user: User): Promise<Group[]> {
        return await this.groupRepository.find({
            where: {
                user: user.id,
                isDeleted: false,
            },
        });
    }

    async create(user: User, group: GroupInput): Promise<Group> {
        try {
            const { id } = await this.groupRepository.save({ ...group, user });
            return await this.getOne(id, user);
        } catch (err) {
            throw new ConflictException(err);
        }
    }

    async remove(id: number, user: User): Promise<boolean> {
        try {
            await this.getOne(id, user);
            await this.groupRepository.update(
                { id },
                {
                    isDeleted: true,
                },
            );
            return true;
        } catch (err) {
            throw new ConflictException(err);
        }
    }
}
