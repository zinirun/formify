import { EntityRepository, Repository } from 'typeorm';
import { Answer } from './answer.entity';

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {
    async findOneByIdWithForm(id: number) {
        return await this.createQueryBuilder('answer')
            .leftJoinAndSelect('answer.form', 'form')
            .where('answer.id = :id', { id })
            .getOne();
    }
}
