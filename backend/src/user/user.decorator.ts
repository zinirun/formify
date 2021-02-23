import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

export const GetUser = createParamDecorator(
    (_data, context: ExecutionContext): User => {
        const request = GqlExecutionContext.create(context).getContext().req;
        return request.user;
    },
);
