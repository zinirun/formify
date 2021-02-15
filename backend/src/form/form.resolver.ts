import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FormInput } from './form.inputs';
import { Form } from './form.entity';
import { FormService } from './form.service';

@Resolver()
export class FormResolver {
    constructor(private readonly formService: FormService) {}

    @Query(() => Form)
    async getFormById(@Args('id') id: number): Promise<Form> {
        return await this.formService.getOne(id);
    }

    @Mutation(() => Form)
    async createForm(@Args('form') form: FormInput): Promise<Form> {
        return await this.formService.create(form);
    }
}
