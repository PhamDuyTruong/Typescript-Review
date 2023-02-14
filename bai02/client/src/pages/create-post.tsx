import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react'
import { useCheckAuth } from '../utils/useCheckAuth';

const  CreatePost = () => {
    const {data: authData, loading: authLoading} = useCheckAuth();
    
    if(authLoading || (!authLoading && !authData?.me)){
        return (
            <Flex justifyContent="center" alignItems="center" minH="100vh">
                <Spinner></Spinner>
            </Flex>
          )
    }else{
        return (
            <div>Create Post</div>
        )
    }

 
}

export default CreatePost