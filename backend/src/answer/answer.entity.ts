import { Field, ObjectType } from '@nestjs/graphql';
import { Form } from 'src/form/form.entity';
import { DateScalar } from 'src/scalars/date';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Answer {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column('text')
    content: string;

    @Field(() => String, { nullable: true })
    @Column('text', { nullable: true })
    etcValue: string;

    /**
     * Join with user -> userId
     */
    @Field(() => Form)
    @ManyToOne(() => Form, (form) => form.answers)
    @JoinColumn()
    form: Form;

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
}
