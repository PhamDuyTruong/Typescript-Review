import { intialPostList } from './../constants/blog';
import { Post } from '../types/blog.type';
import {createReducer, createAction} from '@reduxjs/toolkit';


interface blogState {
   postList: Post[]
}

const initialState: blogState = {
    postList: intialPostList
}

export const addPost = createAction<Post>('blog/addPost')

const blogReducer = createReducer(initialState, builder => {
    builder.addCase(addPost, (state, action) => {
        //ImmerJS giúp chúng ta mutate một state an toàn
        const post = action.payload
        state.postList.push(post)
    })
});

export default blogReducer;