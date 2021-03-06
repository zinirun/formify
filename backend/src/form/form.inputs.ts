import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FormInput {
    @Field(() => Number)
    readonly groupId!: number;

    @Field(() => String)
    readonly title!: string;

    @Field(() => String)
    readonly subtitle: string;

    @Field(() => String)
    readonly content!: string;
}

@InputType()
export class FormUpdateInput {
    @Field(() => String)
    readonly title!: string;

    @Field(() => String)
    readonly subtitle: string;

    @Field(() => String)
    readonly content!: string;
}
