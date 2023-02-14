import { CheckAuth } from './../middleware/checkAuth';
import { Post } from './../entities/Post';
import { Mutation, Resolver, Arg, Query, ID, UseMiddleware, FieldResolver, Root, Int} from 'type-graphql';
import { PostMutationResponse } from './../types/PostMutationResponse';
import { CreatePostInput } from './../types/CreatePostInput';
import { UpdatePostInput } from './../types/UpdatePostInput';
import { User } from './../entities/User';
import { PaginatedPosts } from './../types/PaginatedPosts';
import { LessThan } from 'typeorm';

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
    async posts(
        @Arg("limit", _type=> Int) limit: number,
        @Arg("cursor", {nullable: true}) cursor?: string, 
    ){
        try {
           const totalPostCount = await Post.count();
           const realLimit = Math.min(10, limit);
           const findOptions: {[key: string]: any} = {
            order: {
                createdAt: 'DESC'
            },
            take: realLimit
           }
           let lastPost: Post[] = []
           if(cursor){
            findOptions.where = {createdAt: LessThan(cursor)}
            lastPost = await Post.find({
                order: {createdAt: "ASC"}, take: 1
            })
           }

           const posts = await Post.find(findOptions);
           return {
            totalCount: totalPostCount,
            cursor: posts[posts.length - 1].createdAt,
            hasMore: cursor ? posts[posts.length - 1].createdAt.toString() !== lastPost[0].createdAt.toString() : posts.length !== totalPostCount,
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