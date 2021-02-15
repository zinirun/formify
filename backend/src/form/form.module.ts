import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Form } from './form.entity';
import { FormResolver } from './form.resolver';
import { FormService } from './form.service';

@Module({
    imports: [TypeOrmModule.forFeature([Form]), UserModule],
    providers: [FormResolver, FormService],
    exports: [FormService],
})
export class FormModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(async (req, res, next) => {
            console.log(req);
            //next();
        });
    }
}
