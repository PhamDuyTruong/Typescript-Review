import { COOKIE_NAME } from './../constants';
import { UserMutationResponse } from './../types/UserMutationResponse';
import { User } from './../entities/User';
import { Mutation, Resolver, Arg, Ctx, Query } from 'type-graphql';
import argon2 from 'argon2';
import { RegisterInput } from './../types/RegisterInput';
import { validateRegisterInput } from './../utils/validateRegisterInput';
import { LoginInput } from './../types/LoginInput';
import { Context } from './../types/Context';

@Resolver()
export class UserResolver{
    @Query(_return => User, {nullable: true})
    async me(
        @Ctx() {req}: Context
    ){
        if(!req.session.userId) return null;
        const user = await User.findOne({where: {id: req.session.userId}});
        return user;
    }
    @Mutation(_return => UserMutationResponse, {nullable: true})
    async register(
       @Arg('registerInput') registerInput: RegisterInput,
       @Ctx() {req}: Context
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

        req.session.userId  = createdUser.id
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
    
    @Mutation(_return => UserMutationResponse)
    async login(
        @Arg('loginInput') {usernameOrEmail, password}: LoginInput,
        @Ctx() {req}: Context
        ){
     
        try {
            const existingUser = await User.findOne(usernameOrEmail.includes("@") ? {where: {email: usernameOrEmail}} : {where: {username: usernameOrEmail}});
            if(!existingUser){
                return {
                    code: 400,
                    success: false,
                    message: "User not found",
                    errors: [
                        {field: "usernameOrEmail", message: "Username or email is incorrect"}
                    ]
                }
            }
            const validPassword = await argon2.verify(existingUser.password, password);
            if(!validPassword){
                return {
                    code: 400,
                    success: false,
                    message: "Wrong Password",
                    errors: [
                        {field: "password", message: "Incorrect Password"}
                    ]
                }
            }

            // session: userId == existingUser
            req.session.userId = existingUser.id


            return {
                code: 200,
                success: true,
                message: "Login successfully",
                user: existingUser
            }
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: `Internal server error`,
            };
        }
    }

    @Mutation(_return => Boolean)
    async logout(
        @Ctx() {req, res}: Context
    ){
        return new Promise((resolve, _reject) => {
            res.clearCookie(COOKIE_NAME)
            req.session.destroy(error => {
                if(error){
                    console.log(error)
                    resolve(false)
                }
                resolve(true)
            })
        })
       
    }
}