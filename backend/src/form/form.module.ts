import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { Form } from './form.entity';
import { FormResolver } from './form.resolver';
import { FormService } from './form.service';

@Module({
    imports: [TypeOrmModule.forFeature([Form]), UserModule, AuthModule],
    providers: [FormResolver, FormService],
    exports: [FormService],
})
export class FormModule {}
