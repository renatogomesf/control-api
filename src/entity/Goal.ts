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
export default class Goal {
    @PrimaryGeneratedColumn()
    idGoal: number;

    @Column('text')
    goal: string;

    @Column('float')
    currentValue: number;

    @Column('float')
    totalValue: number;

    @ManyToOne(() => User, (user) => user.goals, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idUser' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
