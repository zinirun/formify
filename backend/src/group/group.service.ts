import {
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormService } from 'src/form/form.service';
import { User } from 'src/user/user.entity';
import { getConnection, Repository } from 'typeorm';
import { Group } from './group.entity';
import { GroupInput } from './group.input';

@Injectable()
export class GroupService {
    constructor(
        @InjectRepository(Group)
        private groupRepository: Repository<Group>,
        @Inject(forwardRef(() => FormService))
        private readonly formService: FormService,
    ) {}

    async getOne(id: number, user: User): Promise<Group> {
        const group = await this.groupRepository.findOne(id, {
            where: {
                user,
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
                user,
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
        const group = await this.getOne(id, user);
        const queryRunner = await getConnection().createQueryRunner();
        await queryRunner.startTransaction();

        try {
            await this.formService.removeByGroup(group);
            await this.groupRepository.update(
                { id },
                {
                    isDeleted: true,
                },
            );
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw new ConflictException(err);
        } finally {
            await queryRunner.release();
            return true;
        }
    }
}
