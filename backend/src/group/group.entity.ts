import { Field, ObjectType } from '@nestjs/graphql';
import { Form } from 'src/form/form.entity';
import { DateScalar } from 'src/scalars/date';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
@ObjectType()
export class Group {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({ length: 40 })
    name: string;

    /**
     * Join with user -> userId
     */
    @Field(() => User)
    @ManyToOne(() => User, (user) => user.forms)
    @JoinColumn()
    user: User;

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
}
