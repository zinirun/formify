import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FormModule } from 'src/form/form.module';
import { Group } from './group.entity';
import { GroupResolver } from './group.resolver';
import { GroupService } from './group.service';

@Module({
    imports: [TypeOrmModule.forFeature([Group]), forwardRef(() => FormModule), AuthModule],
    providers: [GroupService, GroupResolver],
    exports: [GroupService],
})
export class GroupModule {}
