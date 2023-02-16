import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import {ObjectType, Field, ID} from 'type-graphql'
import { Post } from './Post';
import { Upvote } from './Upvote';

@ObjectType()
@Entity() // db table
export class User extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn()
    id !: number

    @Field()
    @Column({unique: true})
    username!: string

    @Field()
    @Column({unique: true})
    email!: string

    @OneToMany(() => Post, post=> post.user)
    posts: Post[]
    
    @OneToMany(_to => Upvote, upvote => upvote.user)
    upvotes: Upvote[]

    @Column()
    password!: string

    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

}