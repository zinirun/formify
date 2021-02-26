import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Group } from './group.entity';
import { GroupResolver } from './group.resolver';
import { GroupService } from './group.service';

@Module({
    imports: [TypeOrmModule.forFeature([Group]), AuthModule],
    providers: [GroupService, GroupResolver],
    exports: [GroupService],
})
export class GroupModule {}
