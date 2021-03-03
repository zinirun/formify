import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FormModule } from 'src/form/form.module';
import { AnswerRepository } from './answer.repository';
import { AnswerResolver } from './answer.resolver';
import { AnswerService } from './answer.service';

@Module({
    imports: [TypeOrmModule.forFeature([AnswerRepository]), FormModule, AuthModule],
    providers: [AnswerService, AnswerResolver],
    exports: [AnswerService],
})
export class AnswerModule {}
