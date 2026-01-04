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
export default class AmountToReceive {
    @PrimaryGeneratedColumn()
    idAmountToReceive: number;

    @Column('text')
    date: string;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column('float')
    value: number;

    @ManyToOne(() => User, (user) => user.amountToReceive, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idUser' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
