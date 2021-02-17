import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FormModule } from './form/form.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DateScalar } from './scalars/date';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            context: ({ req }) => ({ req }),
            cors: {
                credentials: true,
                origin: true,
            },
        }),
        AuthModule,
        UserModule,
        FormModule,
    ],
    providers: [DateScalar],
})
export class AppModule {}

/*
implements NestModule {
    constructor(private readonly authService: AuthService) {}
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(async (req, res, next) => {
                const token: string = req.cookies['x-access-token'] || req.query.token;
                console.log(token);
                if (!token) {
                    return res.status(403).json({
                        message: 'No Token',
                    });
                }
                return await this.authService
                    .verifyToken(token)
                    .then((decoded) => {
                        console.log(decoded);
                        req.decoded = decoded;
                        next();
                    })
                    .catch((error) =>
                        res.status(403).json({
                            message: 'Invalid Token',
                            error,
                        }),
                    );
            })
            .forRoutes('/graphql');
    }
}
*/
