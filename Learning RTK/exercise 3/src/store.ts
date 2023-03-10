import { useDispatch } from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import blogReducer from './pages/blog.slice';

export const store = configureStore({
    reducer: {
        blog: blogReducer
    }
});


// Lấy RootState và AppDispatch từ store của chúng ta 
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()