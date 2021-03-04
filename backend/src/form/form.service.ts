import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
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

    private async generatePubUrl(length: number = 5) {
        const generatedValue = Math.random().toString(36).substr(2, length);
        const isExist = await this.formRepository.findOne({
            where: {
                pubUrl: generatedValue,
            },
        });
        return isExist ? this.generatePubUrl() : generatedValue;
    }

    async getOne(id: number): Promise<Form> {
        const form = await this.formRepository.findOneByIdWithUser(id);
        if (!form) {
            throw new NotFoundException(`Form with ID ${id}: Not Found`);
        }
        return form;
    }

    async getOneByPubUrl(pubUrl: string): Promise<Form> {
        const form = await this.formRepository.findOne({
            where: {
                pubUrl,
            },
        });
        if (!form) {
            throw new NotFoundException(`Form with PUB_URL ${pubUrl}: Not Found`);
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
            const { status } = await this.getOne(id);
            if (status !== 'modify') {
                throw new BadRequestException(`Form #${id} has not modifying status, can't update`);
            }
            await this.formRepository.update({ id }, form);
            return await this.getOne(id);
        } catch (err) {
            throw new ConflictException(err);
        }
    }

    async updateStatusClosed(id: number): Promise<Form> {
        try {
            const { status } = await this.getOne(id);
            if (status === 'closed') {
                throw new BadRequestException(`Form #${id} Already closed, can't update`);
            }
            await this.formRepository.update({ id }, { status: 'closed' });
            return await this.getOne(id);
        } catch (err) {
            throw new ConflictException(err);
        }
    }

    async publish(id: number): Promise<Form> {
        try {
            const { pubUrl } = await this.getOne(id);
            if (pubUrl) {
                throw new BadRequestException(`Form #${id} Already exists: pubUrl`);
            }
            const generatedPubUrl = await this.generatePubUrl();
            await this.formRepository.update({ id }, { pubUrl: generatedPubUrl, status: 'open' });
            return await this.getOne(id);
        } catch (err) {
            throw new ConflictException(err);
        }
    }
}
