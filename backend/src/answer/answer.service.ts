import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { FormService } from 'src/form/form.service';
import { User } from 'src/user/user.entity';
import { Answer } from './answer.entity';
import { AnswerInput } from './answer.inputs';
import { AnswerRepository } from './answer.repository';

@Injectable()
export class AnswerService {
    constructor(
        private answerRepository: AnswerRepository,
        private readonly formService: FormService,
    ) {}

    async getOne(id: number): Promise<Answer> {
        const answer = await this.answerRepository.findOneByIdWithForm(id);
        if (!answer) {
            throw new NotFoundException(`Answer with ID ${id}: Not Found`);
        }
        return answer;
    }

    async getAllByFormId(formId: number, user: User): Promise<Answer[]> {
        await this.formService.getOne(formId, user);
        return await this.answerRepository.find({
            where: {
                form: formId,
            },
        });
    }

    async create(answer: AnswerInput): Promise<Answer> {
        try {
            const form = await this.formService.getOnePublic(answer.formId);
            if (form.status !== 'open') {
                throw new BadRequestException(`Form #${form.id} is not opened, can't create`);
            }
            const { id } = await this.answerRepository.save({ ...answer, form });
            return await this.getOne(id);
        } catch (err) {
            throw new ConflictException(err);
        }
    }
}
