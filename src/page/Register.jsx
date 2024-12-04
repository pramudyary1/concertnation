import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useRadioGroup,
  HStack,
  InputRightElement,
  InputGroup,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Logo from '../component/Logo';
import RadioCard from '../component/RadioCard';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { CloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { register } from '../api/auth';
import axios from 'axios';
import { API_URL } from '../api';

function Register() {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [pass, setPass] = useState('');

  const [email, setEmail] = useState('');
  const emailOnChange = e => {
    setEmail(e.target.value);
  };
  const passOnChange = e => {
    setPass(e.target.value);
  };

  const onClick = async () => {
    setLoading(true);

    let data = {
      email: email,
      password: pass,
      password_confirmation: pass,
      role: role,
    };

    console.log(data);
    try {
      let res = await axios.post(API_URL + 'register', data);
      setLoading(false);
      toast({
        title: 'Account created.',
        description: 'Verificaion email has been sent',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate('/login');
    } catch (e) {
      setLoading(false);
      toast({
        title: 'Something went wrong.',
        description: 'Please try again later',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const [role, setRole] = useState('Personal');

  const options = ['Personal', 'Promotor'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'role',
    defaultValue: 'Personal',
    onChange: setRole,
  });

  useEffect(() => {
    if (localStorage.getItem('user')) navigate('/');
  }, []);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.200', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Flex mt="-4" w="100%" justify="right">
            <RouterLink m="0" to="/">
              <CloseIcon mt="-4" mr="-3" fontSize="xs" />
            </RouterLink>
          </Flex>

          <Stack align={'center'}>
            <Heading fontSize={'2xl'}>
              <Flex>
                Welcome to <Logo />!
              </Flex>
            </Heading>
            <Text mb={8} fontSize={'md'} color={'gray.600'}>
              Register to create your first account and getting start to the
              party
            </Text>
          </Stack>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email </FormLabel>
              <Input type="email" value={email} onChange={emailOnChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={pass}
                  onChange={passOnChange}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword(showPassword => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Select Type of Your Account </FormLabel>
              <HStack w="full" justify="stretch">
                {options.map(value => {
                  const radio = getRadioProps({ value });
                  return (
                    <RadioCard key={value} {...radio}>
                      {value}
                    </RadioCard>
                  );
                })}
              </HStack>
            </FormControl>

            <Stack spacing={10}>
              <Button
                mt={2}
                isLoading={loading}
                bg={'#012E67'}
                color={'white'}
                _hover={{
                  bg: '#012E67',
                }}
                rounded="3xl"
                onClick={onClick}
                py={5}
              >
                Register
              </Button>
            </Stack>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Already have account?{' '}
              <RouterLink to="/login">
                <Link color={'blue.400'}>Login</Link>
              </RouterLink>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default Register;
