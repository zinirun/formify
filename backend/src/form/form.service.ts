import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { GroupService } from 'src/group/group.service';
import { User } from 'src/user/user.entity';
import { Form } from './form.entity';
import { FormInput, FormUpdateInput } from './form.inputs';
import { FormRepository } from './form.repository';

@Injectable()
export class FormService {
    constructor(
        private formRepository: FormRepository,
        private readonly groupService: GroupService,
    ) {}

    async getOne(id: number): Promise<Form> {
        const form = await this.formRepository.findOneByIdWithUser(id);
        if (!form) {
            throw new NotFoundException(`Form with ID ${id}: Not Found`);
        }
        return form;
    }

    async getAllByGroupId(groupId: number): Promise<Form[]> {
        return await this.formRepository.find({
            where: {
                group: groupId,
            },
        });
    }

    async create(user: User, form: FormInput): Promise<Form> {
        try {
            const group = await this.groupService.getOne(form.groupId);
            const { id } = await this.formRepository.save({ ...form, user, group });
            return await this.getOne(id);
        } catch (err) {
            throw new ConflictException(err);
        }
    }

    async update(id: number, form: FormUpdateInput): Promise<Form> {
        try {
            await this.getOne(id);
            await this.formRepository.update({ id }, form);
            return await this.getOne(id);
        } catch (err) {
            throw new ConflictException(err);
        }
    }
}
