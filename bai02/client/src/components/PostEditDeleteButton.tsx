import { EditIcon } from '@chakra-ui/icons'
import { DeleteIcon } from '@chakra-ui/icons'
import { Box, IconButton } from '@chakra-ui/react'
import React from 'react';
import NextLink from 'next/link'

interface PostEditDeleteButtonsProps {
	postId: string
	postUserId: string
}

const PostEditDeleteButton = ({postId, postUserId}: PostEditDeleteButtonsProps) => {
  return (
    <Box>
        <NextLink href={`/post/edit/${postId}`}>
            <IconButton icon={<EditIcon />} aria-label="edit" mr={4}/>
        </NextLink>
        <IconButton icon={<DeleteIcon />} aria-label="delete" colorScheme="red"/>
    </Box>
  )
}

export default PostEditDeleteButton