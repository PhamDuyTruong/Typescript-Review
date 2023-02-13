import { Box, Flex, Heading, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'

const Navbar = () => {
  return (
    <Box bg="tan" p={4}>
        <Flex maxW={800} justifyContent="space-between" align="center" m="auto">
            <NextLink href="/">
                    <Heading>
                        Reddit
                     </Heading>
            </NextLink>
          
            <Box>
                <NextLink href="/Login">
                     <Link mr="2">Login </Link>
                </NextLink>
                <NextLink href="/Register">
                     <Link mr="2">Register</Link>
                </NextLink>
                
            </Box>
        </Flex>
    </Box>
  )
}

export default Navbar