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

    @Column('date')
    date: Date;

    @Column('text')
    description: string;

    @Column('double')
    value: number;

    @ManyToOne(() => User, (user) => user.amountToReceive, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idUser' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
