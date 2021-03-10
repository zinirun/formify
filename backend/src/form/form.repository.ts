import { EntityRepository, Repository } from 'typeorm';
import { Form } from './form.entity';

@EntityRepository(Form)
export class FormRepository extends Repository<Form> {
    async findOneByIdWithUser(id: number, userId: number) {
        return await this.createQueryBuilder('form')
            .leftJoinAndSelect('form.user', 'user')
            .where('form.id = :id and form.userId = :userId and form.isDeleted = 0', { id, userId })
            .getOne();
    }
}
