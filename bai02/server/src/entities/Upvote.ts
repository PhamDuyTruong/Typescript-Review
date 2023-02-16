import { User } from './User';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Post } from "./Post";

@Entity()
export class Upvote extends BaseEntity{
    @PrimaryColumn()
    userId!: number

    @PrimaryColumn()
    postId!:number

    @ManyToOne(_to => Post, post => post.upvotes)
    post!: Post

    @ManyToOne(_to => User, user => user.upvotes)
    user!: User
    
    @Column()
    value!: number
}