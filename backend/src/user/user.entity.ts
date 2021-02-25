import { Field, ObjectType } from '@nestjs/graphql';
import { Group } from 'src/group/group.entity';
import { DateScalar } from 'src/scalars/date';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Form } from '../form/form.entity';

@Entity()
@ObjectType()
export class User {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column('text')
    provider: string;

    @Field(() => String)
    @Column('text')
    providerId: string;

    @Field(() => String, { nullable: true })
    @Column('text', { nullable: true })
    email: string;

    @Field(() => String)
    @Column()
    username: string;

    /**
     * DB insert time.
     */
    @Field(() => DateScalar)
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    /**
     * DB last update time.
     */
    @Field(() => DateScalar)
    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;

    @OneToMany(() => Form, (form) => form.user)
    forms: Form[];

    @OneToMany(() => Group, (group) => group.user)
    groups: Group[];
}
