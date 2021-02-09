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
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    provider: string;

    @Column('text')
    providerId: string;

    @Column('text')
    email: string;

    @Column()
    username: string;

    /**
     * DB insert time.
     */
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;

    /**
     * DB last update time.
     */
    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;

    @OneToMany(() => Form, (form) => form.user)
    forms: Form[];
}
