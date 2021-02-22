import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { GithubStrategy } from './strategies/github.strategy';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy, GithubStrategy],
    exports: [AuthService],
})
export class AuthModule {}
