import { Box, Card, CardBody, Link as ChakraLink, Flex } from '@chakra-ui/react'
import { Link as InertiaLink } from '@inertiajs/react'
import React from 'react'

const AdminMenu = () => {
  return (
    <Box>
      <Card>
        <CardBody>
          <Flex direction="column">
            <ChakraLink as={InertiaLink} href="/admin/fleet">
              Fleet
            </ChakraLink>
            <ChakraLink as={InertiaLink} href="/admin/users">
              Users
            </ChakraLink>
            <ChakraLink as={InertiaLink} href="/admin/pireps">
              Pireps
            </ChakraLink>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  )
}

export default AdminMenu
