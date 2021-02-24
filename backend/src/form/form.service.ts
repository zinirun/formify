import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Form } from './form.entity';
import { FormInput } from './form.inputs';
import { FormRepository } from './form.repository';

@Injectable()
export class FormService {
    constructor(
        @InjectRepository(Form)
        private formRepository: FormRepository,
    ) {}

    async getOne(id: number): Promise<Form> {
        const form = await this.formRepository.findOneByIdWithUser(id);
        if (!form) {
            throw new NotFoundException(`Form with ID ${id}: Not Found`);
        }
        return form;
    }

    async create(user: User, form: FormInput): Promise<Form> {
        try {
            const { id } = await this.formRepository.save({ ...form, user });
            return await this.getOne(id);
        } catch (err) {
            throw new ConflictException(err);
        }
    }
}
