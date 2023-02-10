import { UserMutationResponse } from './../types/UserMutationResponse';
import { User } from './../entities/User';
import { Mutation, Resolver, Arg } from 'type-graphql';
import argon2 from 'argon2';
import { RegisterInput } from './../types/RegisterInput';
import { validateRegisterInput } from './../utils/validateRegisterInput';

@Resolver()
export class UserResolver{
    @Mutation(_returns => UserMutationResponse, {nullable: true})
    async register(
       @Arg('registerInput') registerInput: RegisterInput,
       
    ){
      const validateRegisterInputErrors = validateRegisterInput(registerInput);
      if(validateRegisterInputErrors !== null){
        return {
            code: 400,
            success: false,
            ...validateRegisterInputErrors
        }
      }
      try {
        const {username, email, password} = registerInput
        const existingUser = await User.findOne({where: [{ username }, {email}]})
        if(existingUser) return {
            code: 400,
            success: false,
            message: 'Duplicated username or email',
            errors: [
                {field: existingUser.username === username ? "username": "email", message: "Username or email already taken"}
            ]
        };

        const hashedPass = await argon2.hash(password)

        const newUser = User.create({
            username, 
            password: hashedPass,
            email
        });

        const createdUser = await User.save(newUser);

        return {
            code: 200,
            success: true,
            message: "User registration successful",
            user: createdUser,

        }

      } catch (error) {
        return {
            code: 500,
            success: false,
            message: `Internal server error`,
        };
      }
    }   
}