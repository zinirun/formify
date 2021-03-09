import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FormInput, FormUpdateInput } from './form.inputs';
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
    async getFormById(@GetUser() user: User, @Args('id') id: number): Promise<Form> {
        return await this.formService.getOne(id, user);
    }

    @UseGuards(LoginGuard)
    @Query(() => Form)
    async getFormByPubUrl(@Args('pubUrl') pubUrl: string): Promise<Form> {
        return await this.formService.getOneByPubUrl(pubUrl);
    }

    @UseGuards(LoginGuard)
    @Query(() => [Form])
    async getFormsByGroupId(@Args('groupId') id: number): Promise<Form[]> {
        return await this.formService.getAllByGroupId(id);
    }

    @UseGuards(LoginGuard)
    @Mutation(() => Form)
    async createForm(@GetUser() user: User, @Args('form') form: FormInput): Promise<Form> {
        return await this.formService.create(user, form);
    }

    @UseGuards(LoginGuard)
    @Mutation(() => Form)
    async updateForm(
        @GetUser() user: User,
        @Args('id') id: number,
        @Args('form') form: FormUpdateInput,
    ): Promise<Form> {
        return await this.formService.update(id, form, user);
    }

    @UseGuards(LoginGuard)
    @Mutation(() => Form)
    async publishForm(@GetUser() user: User, @Args('id') id: number): Promise<Form> {
        return await this.formService.publish(id, user);
    }

    @UseGuards(LoginGuard)
    @Mutation(() => Form)
    async updateFormStatusClosed(@GetUser() user: User, @Args('id') id: number): Promise<Form> {
        return await this.formService.updateStatusClosed(id, user);
    }
}
