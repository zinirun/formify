import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { GroupModule } from 'src/group/group.module';
import { UserModule } from 'src/user/user.module';
import { FormRepository } from './form.repository';
import { FormResolver } from './form.resolver';
import { FormService } from './form.service';

@Module({
    imports: [TypeOrmModule.forFeature([FormRepository]), UserModule, AuthModule, GroupModule],
    providers: [FormResolver, FormService],
    exports: [FormService],
})
export class FormModule {}
