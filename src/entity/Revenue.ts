import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from './User';

@Entity()
export default class Revenue {
    @PrimaryGeneratedColumn()
    idRevenue: number;

    @Column('text')
    date: string;

    @Column('text')
    description: string;

    @Column('float')
    value: number;

    @ManyToOne(() => User, (user) => user.revenue, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idUser' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
