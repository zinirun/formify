import { Field, ObjectType } from '@nestjs/graphql';
import { Group } from 'src/group/group.entity';
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
import { User } from '../user/user.entity';

@Entity()
@ObjectType()
export class Form {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({ length: 40 })
    title: string;

    @Field(() => String)
    @Column('text')
    content: string;

    /**
     * Join with user -> userId
     */
    @Field(() => User)
    @ManyToOne(() => User, (user) => user.forms)
    @JoinColumn()
    user: User;

    /**
     * Join with user -> userId
     */
    @Field(() => Group)
    @ManyToOne(() => Group, (group) => group.forms)
    @JoinColumn()
    group: Group;

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
