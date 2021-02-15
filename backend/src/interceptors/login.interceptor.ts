import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LoginInterceptor implements NestInterceptor {
    constructor(private readonly authService: AuthService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const cookie = request.cookies['x-access-token'] || null;
        console.log(cookie);
        console.log('!LoginInterceptor!');
        return next.handle();
    }
}
