import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from './form.entity';
import { FormInput } from './form.inputs';

@Injectable()
export class FormService {
    constructor(
        @InjectRepository(Form)
        private formRepository: Repository<Form>,
    ) {}

    async getOne(id: number): Promise<Form> {
        const form = await this.formRepository.findOne(id);
        if (!form) {
            throw new NotFoundException(`Form with ID ${id}: Not Found`);
        }
        return form;
    }

    async create(form: FormInput): Promise<Form> {
        try {
            const { id } = await this.formRepository.save(form);
            return await this.getOne(id);
        } catch (err) {
            throw new ConflictException(err);
        }
    }
}
