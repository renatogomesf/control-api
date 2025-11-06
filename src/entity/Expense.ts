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
export default class Expense {
    @PrimaryGeneratedColumn()
    idExpense: number;

    @Column('date')
    date: Date;

    @Column('text')
    description: string;

    @Column('double')
    value: number;

    @ManyToOne(() => User, (user) => user.expense, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idUser' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
