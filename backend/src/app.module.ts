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
            typePaths: ['./**/*.graphql'],
            definitions: {
                path: join(process.cwd(), 'src/autogen/schema.graphql.ts'),
                outputAs: 'class',
            },
        }),
        AuthModule,
        UserModule,
        FormModule,
    ],
    providers: [DateScalar],
})
export class AppModule {}
