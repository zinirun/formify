import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FormInput } from './form.inputs';
import { Form } from './form.entity';
import { FormService } from './form.service';
import { UseGuards } from '@nestjs/common';
import { LoginGuard } from 'src/guards/login.guard';
import { User } from 'src/user/user.entity';
import { GetUser } from 'src/user/user.decorator';

@Resolver()
export class FormResolver {
    constructor(private readonly formService: FormService) {}

    @UseGuards(LoginGuard)
    @Query(() => Form)
    async getFormById(@Args('id') id: number): Promise<Form> {
        return await this.formService.getOne(id);
    }

    @UseGuards(LoginGuard)
    @Mutation(() => Form)
    async createForm(@GetUser() user: User, @Args('form') form: FormInput): Promise<Form> {
        return await this.formService.create(user, form);
    }
}
