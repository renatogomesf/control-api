import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Goal from './Goal';

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
