import { ReactNode } from 'react';
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  Center,
  Wrap,
  Heading,
  Divider,
} from '@chakra-ui/react';
import { FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import Logo from './Logo';

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('#012E67', 'gray.900')}
      color={useColorModeValue('gray.300', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <Heading fontSize={'2xl'} mx="5" mb="5" color="gray.100">&nbsp;CONCERTNATION</Heading>
        <Wrap justify={"space-around"} spacing={20}>
          <Stack align={'flex-start'} w="500px">
            <Text>Concertnation is a web-based platform that provides concert ticket purchasing services. Now you can buy concert ticket without to come to the venue with Concertnation. </Text>
          </Stack>

          <Stack align={'flex-start'}>
            <Link href={'#'}>About Us</Link>
            <Link href={'#'}>Term and Conditions</Link>
            <Link href={'#'}>FAQ</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader >Follow Us</ListHeader>
            <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
          </Stack>
        </Wrap>
      </Container>
      <Box
        w="full"
        >
        <Divider />    
        <Center
        
        w="full"
        as={Stack}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        
        justify={{ md: 'center' }}
        align={{ md: 'center' }}>
          <Text>Concertnation © 2023. All rights reserved</Text>
        </Center>
      </Box>
    </Box>
  );
}