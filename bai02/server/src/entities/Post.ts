import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne} from 'typeorm';
import {ObjectType, Field, ID} from 'type-graphql'
import { User } from './User';

@ObjectType()
@Entity()
export class Post extends BaseEntity{
    @Field(_type => ID)
    @PrimaryGeneratedColumn()
    id!:number

    @Field()
    @Column()
    title!:string

    @Field({nullable: true})
    @Column({nullable: true})
    userId: number

    @Field(_type => User)
    @ManyToOne(() => User, user => user.posts)
    user: User

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
