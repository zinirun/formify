import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(cookieParser());
    await app.listen(4000);
}
bootstrap();
