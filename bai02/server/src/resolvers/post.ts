import { Context } from './../types/Context';
import { Post } from './../entities/Post';
import { Mutation, Resolver, Arg, Query, ID, Ctx} from 'type-graphql';
import { PostMutationResponse } from './../types/PostMutationResponse';
import { CreatePostInput } from './../types/CreatePostInput';
import { UpdatePostInput } from './../types/UpdatePostInput';
import { AuthenticationError } from 'apollo-server-express';

@Resolver()
export class PostResolver{
    @Mutation(_return => PostMutationResponse)
    async createPost(
        @Arg('createPostInput') {title, text}: CreatePostInput
    ){

        try {
            const newPost = Post.create({
                title,
                text
            })
    
            await newPost.save();
            return {
                code: 200,
                success: true,
                message: "Post created successfully",
                post: newPost
            }
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: `Internal server error`,
            };
        }
   
    }

    @Query(_return => [Post], {nullable: true})
    async posts(){
        try {
            return Post.find();
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: `Internal server error`,
            };
        }
      
    }

    @Query(_return => Post, {nullable: true})
    async post(
        @Arg("id", _type=> ID) id: number | undefined
    ){
        try {
            const post = await Post.findOne({where: {id}});
            return post
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: `Internal server error`,
            };
        }
       
    }

    @Mutation(_return => PostMutationResponse)
    async updatePost(
        @Arg('updatePostInput') {id, title, text}: UpdatePostInput 
    ){
        const existingPost = await Post.findOne({where: {id}})
        if(!existingPost){
            return{
                code:400,
                success: false,
                message: "Post is not found"
            }
        }
        existingPost.title = title;
        existingPost.text = text;
        await existingPost.save();

        return {
            code: 200,
            success: true,
            message: "Post updated successfully",
            post: existingPost
        }
    }

    @Mutation(_return => PostMutationResponse)
    async deletePost(
        @Arg('id', _type => ID) id: number,
        @Ctx() {req}: Context
    ){
        if(!req.session.userId){
            throw new AuthenticationError("Not authenticated")
        }
        const existingPost = await Post.findOne({where: {id}})
        if(!existingPost){
            return{
                code:400,
                success: false,
                message: "Post is not found"
            }
        }
        await Post.delete({id})

        return {
            code: 200,
            success: true,
            message: "Post deleted successfully"
        }
    }
}