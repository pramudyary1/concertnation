import React, { ReactNode, useEffect } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  Wrap,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiUser,
  FiCalendar,
  FiLogOut,
  FiBarChart
} from 'react-icons/fi';
import {Link as RouterLink, useNavigate} from "react-router-dom";
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { Outlet } from 'react-router-dom';
import Logo from '../../component/Logo';

const LinkItems = [
  { name: 'Dashboard', icon: FiHome, href:"/promotor" },
  { name: 'Event', icon: FiCalendar, href:"/promotor/event" },
  { name: 'Data Order', icon: FiBarChart, href:"/promotor/order" },
];

export default function PromotorPage({
  children,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate()
  useEffect(()=> {
      console.log('awdawdaw')
      if(!localStorage.getItem('user')) return navigate('/login')
      if(JSON.parse(localStorage.getItem('user'))['role'] != 'Promotor') return navigate('/')
  },[])
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet/>
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="100vh"
      maxH="100vh"
      {...rest}>
      <Flex h="20" alignItems="center" mx="2" justifyContent="space-between">
          <Logo/>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Flex direction="column" h="100%">
        {LinkItems.map((link) => (
            <RouterLink key={link.name} to={link.href}>
                <NavItem  icon={link.icon}>
                {link.name}
                </NavItem>
            </RouterLink>
        ))}
        {/* <Spacer/> */}
        {/* <Flex flex="1"  w="full" align="center"> */}
        {/* <NavItem w="full" icon={FiLogOut}>
            Logout
        </NavItem> */}
        {/* </Flex> */}
      </Flex>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate()
  const onLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login')
  }
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        <Logo/>
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                    <Text fontSize="sm">{JSON.parse(localStorage.getItem('user'))['email']}</Text>
                
                </VStack>
                <Avatar
                  bg="gray.300"
                  size={'sm'}
                  src={
                    'https://bit.ly/broken-link'
                  }
                />
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem onClick={onLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};