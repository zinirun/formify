import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FormInput {
    @Field(() => String)
    readonly title!: string;

    @Field(() => String)
    readonly content!: string;
}
