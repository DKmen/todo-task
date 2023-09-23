import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm"
import { Status } from "../constant/dto/task.dto"


@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column({ type: 'enum', enum: Status, default: Status.New })
    status: Status

    @UpdateDateColumn()
    updateAt: Date

    @CreateDateColumn()
    createAt: Date
}