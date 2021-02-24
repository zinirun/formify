import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { Form } from './form.entity';
import { FormInput } from './form.inputs';

@Injectable()
export class FormService {
    constructor(
        @InjectRepository(Form)
        private formRepository: Repository<Form>,
    ) {}

    async getOne(id: number): Promise<Form> {
        const form = await this.formRepository
            .createQueryBuilder('form')
            .leftJoinAndSelect('form.user', 'user')
            .where('form.id = :id', { id })
            .getOne();
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
