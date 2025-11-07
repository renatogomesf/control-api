import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Goal from './Goal';
import Revenue from './Revenue';
import Expense from './Expense';
import AmountToReceive from './AmountToReceive';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    idUser: number;

    @Column('text')
    name: string;

    @Column('text')
    lastName: string;

    @Column('text')
    email: string;

    @Column('text')
    password: string;

    @OneToMany(() => Goal, (goal) => goal.user)
    goals?: Goal[];

    @OneToMany(() => Revenue, (revenue) => revenue.user)
    revenue?: Revenue[];

    @OneToMany(() => Expense, (expense) => expense.user)
    expense?: Expense[];

    @OneToMany(() => AmountToReceive, (amountToReceive) => amountToReceive.user)
    amountToReceive?: AmountToReceive[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
