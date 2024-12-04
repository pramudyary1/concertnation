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
    FormErrorMessage,
    useToast,
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Logo from '../component/Logo';
import RadioCard from '../component/RadioCard';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { CloseIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { API_URL } from '../api';
  
function Login() {
    const navigate = useNavigate()
    const toast = useToast()
    
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [pass, setPass] = useState('')
    
    const [email, setEmail] = useState('')
    const emailOnChange = (e) => {
        setEmail(e.target.value)
    }
    const passOnChange = (e) => {
        setPass(e.target.value)
    }

    const onClick = async ()  => {
        setLoading(true)

        let data = {
            email : email,
            password : pass,
            role : role
        }
        
        console.log(data)
        try{
            let res = await axios.post(API_URL+'login', data)
            setLoading(false)
            toast({
                title: 'Login success.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            localStorage.setItem("user", JSON.stringify(res.data.data.user) )
            localStorage.setItem("token", res.data.data.token)
            console.log(res.data.data.user.role)
            if(res.data.data.user.role == 'admin')
                navigate("/admin")
            else if(res.data.data.user.role == 'Promotor')
                navigate("/promotor")
            else navigate("/admin")
             
        }
        catch(e){
            setLoading(false)
            console.log(e)
            toast({
                title: 'Something went wrong.',
                description: "Please try again later",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    } 

    const options = ['Personal', 'Promotor']
    const [role, setRole]= useState('Personal');
    
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'role',
        defaultValue: 'Personal',
        onChange: setRole,
    })

    useEffect(()=> {
        if(localStorage.getItem('user')) navigate('/')
    },[])

    return (
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.200', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Flex mt="-4"  w="100%" justify="right"><RouterLink m="0" to="/"><CloseIcon mt="-4" mr="-3" fontSize="xs"/></RouterLink></Flex>
            <Stack align={'center'}>
                <Heading fontSize={'2xl'}><Flex>Welcome to <Logo/>!</Flex></Heading>
                <Text mb={8} fontSize={'md'} color={'gray.600'}>
                    Log In to your acccount and getting start to the party
                </Text>
            </Stack>
            <Stack spacing={4}>
                <FormControl id="email" isInvalid={(email == "" && isSubmitted)}>
                    <FormLabel>Email </FormLabel>
                    <Input type="email" value={email} onChange={emailOnChange}/>
                    <FormErrorMessage>Field is required</FormErrorMessage>
                </FormControl>
                <FormControl id="password" >
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input type={showPassword ? 'text' : 'password'} value={pass} onChange={passOnChange}/>
                        <InputRightElement h={'full'}>
                        <Button
                            variant={'ghost'}
                            onClick={() =>
                            setShowPassword((showPassword) => !showPassword)
                            }>
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl id="password">
                <FormLabel>Select Type of Your Account </FormLabel>
                <HStack w="full"  justify="stretch" >
                {options.map((value) => {
                    const radio = getRadioProps({ value })
                    return (
                    <RadioCard key={value} {...radio}>
                        {value}
                    </RadioCard>
                    )
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
                    Login
                </Button>
                </Stack>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don't have an account? <RouterLink to="/register"><Link  color={'blue.400'} >Register</Link></RouterLink>
              </Text>
            </Stack>
            </Box>
        </Stack>
        </Flex>
    );
  }
  
  export default Login;
  