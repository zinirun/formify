import { Query, UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { LoginGuard } from 'src/guards/login.guard';
import { GetUser } from './user.decorator';
import { User } from './user.entity';

@Resolver()
export class UserResolver {
    @UseGuards(LoginGuard)
    @Query(() => User)
    getUser(@GetUser() user: User): User {
        return user;
    }
}
