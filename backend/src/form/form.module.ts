import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './form.entity';
import { FormResolver } from './form.resolver';
import { FormService } from './form.service';

@Module({
    imports: [TypeOrmModule.forFeature([Form])],
    providers: [FormResolver, FormService],
})
export class FormModule {}
