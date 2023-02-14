import { EditIcon } from '@chakra-ui/icons'
import { DeleteIcon } from '@chakra-ui/icons/dist/Delete'
import { Box, IconButton } from '@chakra-ui/react'
import React from 'react'

const PostEditDeleteButton = () => {
  return (
    <Box>
        <IconButton icon={<EditIcon />} aria-label="edit" mr={4}/>
        <IconButton icon={<DeleteIcon />} aria-label="delete" colorScheme="red"/>
    </Box>
  )
}

export default PostEditDeleteButton