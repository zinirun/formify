import { Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Request() req) {
        console.log(req.user);
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Request() req, @Response() res): Promise<Response> {
        return await this.authService.googleLogin(req, res);
    }

    @Post('logout')
    async logout(@Request() _, @Response() res): Promise<Response> {
        return await this.authService.logout(_, res);
    }
}
