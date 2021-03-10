import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FormModule } from './form/form.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { DateScalar } from './scalars/date';
import { GroupModule } from './group/group.module';
import { AnswerModule } from './answer/answer.module';

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
        GroupModule,
        FormModule,
        AnswerModule,
    ],
    providers: [DateScalar],
})
export class AppModule {}
