import { Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Request() req) {}

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Request() req, @Response() res): Promise<Response> {
        return await this.authService.oAuthLogin(req, res);
    }

    @Get('github')
    @UseGuards(AuthGuard('github'))
    async githubAuth(@Request() req) {}

    @Get('github/redirect')
    @UseGuards(AuthGuard('github'))
    async githubAuthRedirect(@Request() req, @Response() res): Promise<Response> {
        return await this.authService.oAuthLogin(req, res);
    }

    @Post('logout')
    async logout(@Response() res): Promise<Response> {
        return await this.authService.logout(res);
    }
}
