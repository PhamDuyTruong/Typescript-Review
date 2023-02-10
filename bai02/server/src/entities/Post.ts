import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from 'typeorm';

@Entity()
export class Post extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    title!:string

    @Column()
    text!:string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
    
}
