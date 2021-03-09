import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LoginGuard } from 'src/guards/login.guard';
import { GetUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { Answer } from './answer.entity';
import { AnswerInput } from './answer.inputs';
import { AnswerService } from './answer.service';

@Resolver()
export class AnswerResolver {
    constructor(private readonly answerService: AnswerService) {}

    @UseGuards(LoginGuard)
    @Query(() => Answer)
    async getAnswerById(@Args('id') id: number): Promise<Answer> {
        return await this.answerService.getOne(id);
    }

    @UseGuards(LoginGuard)
    @Query(() => [Answer])
    async getAnswersByFormId(
        @GetUser() user: User,
        @Args('formId') formId: number,
    ): Promise<Answer[]> {
        return await this.answerService.getAllByFormId(formId, user);
    }

    @Mutation(() => Answer)
    async createAnswer(@Args('answer') answer: AnswerInput): Promise<Answer> {
        return await this.answerService.create(answer);
    }
}
