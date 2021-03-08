import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AnswerInput {
    @Field(() => Number)
    readonly formId!: number;

    @Field(() => String)
    readonly content!: string;

    @Field(() => String, { nullable: true })
    readonly etcValue: string;
}
