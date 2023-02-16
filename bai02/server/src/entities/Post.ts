import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne, OneToMany} from 'typeorm';
import {ObjectType, Field, ID} from 'type-graphql'
import { User } from './User';
import { Upvote } from './Upvote';

@ObjectType()
@Entity()
export class Post extends BaseEntity{
    @Field(_type => ID)
    @PrimaryGeneratedColumn()
    id!:number

    @Field()
    @Column()
    title!:string

    @Field()
    @Column()
    userId!: number

    @OneToMany(_to => Upvote, upvote => upvote.post)
    upvotes: Upvote[]

    @Field(_type => User)
    @ManyToOne(() => User, user => user.posts)
    user: User

    @Field()
    @Column({default: 0})
    points!:number

    @Field()
	voteType!: number

    @Field()
    @Column()
    text!:string

    @Field()
    @CreateDateColumn({type: 'timestamptz'})
    createdAt: Date


    @Field()
    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date
    
}
