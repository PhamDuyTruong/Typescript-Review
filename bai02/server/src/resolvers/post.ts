import { CheckAuth } from './../middleware/checkAuth';
import { Post } from './../entities/Post';
import { Mutation, Resolver, Arg, Query, ID, UseMiddleware, FieldResolver, Root} from 'type-graphql';
import { PostMutationResponse } from './../types/PostMutationResponse';
import { CreatePostInput } from './../types/CreatePostInput';
import { UpdatePostInput } from './../types/UpdatePostInput';
import { User } from './../entities/User';
import { PaginatedPosts } from './../types/PaginatedPosts';

@Resolver(_of => Post)
export class PostResolver{
    @FieldResolver(_return => String)
    textSnippet(@Root() parent: Post){
        return parent.text.slice(0, 50);
    }

    @FieldResolver(_return => User)
    async user(@Root() root: Post){
        return await User.findOne({where: {id: root.userId}})
    }


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

    @Query(_return => PaginatedPosts, {nullable: true})
    async posts(){
        try {
           const posts = await Post.find();
           return {
            totalCount: 5,
            cursor: new Date(),
            hasMore: true,
            paginatedPosts: posts
           }
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
    @UseMiddleware(CheckAuth)
    async deletePost(
        @Arg('id', _type => ID) id: number,
    ){
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