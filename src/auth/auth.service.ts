import { Injectable, UnauthorizedException, Response } from '@nestjs/common';
import { sign, SignOptions, verify } from 'jsonwebtoken';
import { config } from 'dotenv';
import { User } from 'src/user/user.entity';

config();

@Injectable()
export class AuthService {
    private readonly jwtOptions: SignOptions;
    private readonly jwtKey: string;

    constructor() {
        this.jwtOptions = {
            expiresIn: '7d',
        };
        this.jwtKey = process.env.JWT_SECRET_KEY;
    }

    async googleLogin(req, res): Promise<Response> {
        if (!req.user) {
            return res.json({
                success: false,
                message: 'No user provided',
            });
        }

        try {
            const token = this.createToken(req.user);

            res.cookie('x-access-token', token, { httpOnly: true });

            return res.json({
                success: true,
                message: 'User information from google',
                user: req.user,
            });
        } catch (err) {
            throw new UnauthorizedException(err);
        }
    }

    private createToken(user: User): string {
        const payload = {
            id: user.id,
            provider: user.provider,
            providerId: user.providerId,
            email: user.email,
        };

        return sign(payload, this.jwtKey, this.jwtOptions);
    }
}
