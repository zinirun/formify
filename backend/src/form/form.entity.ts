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
export class Form {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 40 })
    title: string;

    @Column('text')
    content: string;

    /**
     * Join with user -> userId
     */

    @ManyToOne(() => User, (user) => user.forms)
    @JoinColumn()
    user: User;

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
}
