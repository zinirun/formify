import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LoginGuard } from 'src/guards/login.guard';
import { GetUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { Group } from './group.entity';
import { GroupInput } from './group.input';
import { GroupService } from './group.service';

@Resolver()
export class GroupResolver {
    constructor(private readonly groupService: GroupService) {}

    @UseGuards(LoginGuard)
    @Query(() => [Group])
    async getGroups(@GetUser() user: User): Promise<Group[]> {
        return await this.groupService.getAll(user);
    }

    @UseGuards(LoginGuard)
    @Mutation(() => Group)
    async createGroup(@GetUser() user: User, @Args('group') group: GroupInput): Promise<Group> {
        return await this.groupService.create(user, group);
    }

    @UseGuards(LoginGuard)
    @Mutation(() => Boolean)
    async removeGroup(@GetUser() user: User, @Args('id') id: number): Promise<boolean> {
        return await this.groupService.remove(id, user);
    }
}
