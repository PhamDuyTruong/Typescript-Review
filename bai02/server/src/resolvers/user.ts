import { User } from './../entities/User';
import {Mutation, Resolver, Arg} from 'type-graphql';
import argon2 from 'argon2';

@Resolver()
export class UserResolver{
    @Mutation(_returns => User, {nullable: true})
    async register(
       @Arg('email') email: string,
       @Arg('username') username: string,
       @Arg('password') password: string
    ){
      try {
        const existingUser = await User.findOne({where: { username }})
        if(existingUser) return null;

        const hashedPass = await argon2.hash(password)

        const newUser = User.create({
            username, 
            password: hashedPass,
            email
        });

        return await User.save(newUser)
      } catch (error) {
        console.log(error)
        return null
      }
    }   
}