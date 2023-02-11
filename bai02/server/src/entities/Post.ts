import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn} from 'typeorm';
import {ObjectType, Field, ID} from 'type-graphql'

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
    text!:string

    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date
    
}
