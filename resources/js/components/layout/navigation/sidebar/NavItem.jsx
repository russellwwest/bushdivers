import {
  Box,
  Button,
  Link as ChakraLink,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react'
import { Link as InertiaLink, usePage } from '@inertiajs/react'
import React from 'react'

const NavItem = ({ to, icon, text, isExternal = false }) => {
  const { url } = usePage().props

  return (
    <Box my={2}>
      <ChakraLink
        as={isExternal ? '' : InertiaLink}
        href={to}
        target={isExternal ? '_blank' : ''}
      >
        <Button
          colorScheme={url === to ? 'orange' : ''}
          variant={url === to ? 'solid' : 'ghost'}
          justifyContent="flex-start"
          width="100%"
        >
          <Flex alignItems="center" gap={3}>
            <Icon as={icon} />
            <Text>{text}</Text>
          </Flex>
        </Button>
      </ChakraLink>
    </Box>
  )
}

export default NavItem
