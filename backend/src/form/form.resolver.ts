import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FormInput } from './form.inputs';
import { Form } from './form.entity';
import { FormService } from './form.service';
import { UseInterceptors } from '@nestjs/common';
import { LoginInterceptor } from 'src/interceptors/login.interceptor';

@Resolver()
export class FormResolver {
    constructor(private readonly formService: FormService) {}

    @UseInterceptors(LoginInterceptor)
    @Query(() => Form)
    async getFormById(@Args('id') id: number): Promise<Form> {
        return await this.formService.getOne(id);
    }

    @UseInterceptors(LoginInterceptor)
    @Mutation(() => Form)
    async createForm(@Args('form') form: FormInput): Promise<Form> {
        return await this.formService.create(form);
    }
}
