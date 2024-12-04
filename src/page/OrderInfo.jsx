import { Container, Image, Heading, HStack, Stack, Text, Divider, Flex, FormControl, FormLabel, Input, Wrap, WrapItem, Button, Center, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toCurrency } from "..";
import { API_URL, config } from "../api";
import noimg from "../asset/img/noimg.jpg"

export default function OrderInfo(props){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const data =  props.data
    const amount =  props.amount
    const user =  props.user
    
    const [form, setform] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',  
    })
    
    const firstOnChange = (e) => {
        setform({...form, first_name:e.target.value})
    }
    const lastOnChange = (e) => {
        setform({...form, last_name:e.target.value})
    }
    const emailOnChange = (e) => {
        setform({...form, email:e.target.value})
    }
    const phoneOnChange = (e) => {
        setform({...form, phone:e.target.value})
    }

    const onSubmit = (e) => {
        setLoading(true)
        const {email, ...req} = form;

        axios.put(API_URL+'user/'+user.id, req, config())
        .then(res=> {
            console.log(res)
            localStorage.setItem('user', JSON.stringify(res.data.data))
            props.setIndex(1)
        })
        .catch(err=>{
            console.log(err)
            toast({
                title: 'Something went wrong',
                status: 'error',
                isClosable: true,
                duration: 1000
            })
        })
        .finally( () => setLoading(false))
    }
    const onCancel = (e) => {
        navigate("/");
    }

    useEffect(() => {
        setform({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,  
        })
    },[user])
    

    return (
        <Container pt="xl" maxW="6xl">
            <Stack spacing="5">
                <Stack textAlign={"center"} mt="20px">
                    <Heading fontSize={"3xl"} color="blue.800">Order Information</Heading>
                    <Text fontSize={"lg"} color="gray.400">Please fill up the fields below</Text>
                </Stack>
                <Wrap w="100%" spacing={8} >
                    <WrapItem>
                        <Stack>
                            <Image maxW="380px" src={ data.images && data.images.length > 0 ? data.images[0].url : noimg}></Image>
                            <HStack w="full" justify={"space-between"} align="start">
                                <Stack>
                                    <Heading fontSize={"lg"} color="blue.800">{data.title}</Heading>
                                    <Text fontSize={"lg"} color="gray.400">{data.location}</Text>
                                </Stack>
                                <Flex>
                                    <Text color="blue.800">{toCurrency(data.price * amount)}</Text>
                                    <Text color="gray.400">&nbsp;untuk&nbsp;</Text>
                                    <Text   color="blue.800">{amount} Ticket</Text>
                                </Flex>
                            </HStack>
                        </Stack>
                    </WrapItem>
                    <WrapItem>
                    <Divider orientation='vertical' />
                    </WrapItem>
                    <WrapItem flex="1">
                        <Stack w="100%">
                            <FormControl id="first"   >
                                <FormLabel>First Name</FormLabel>
                                <Input bg="gray.50" type="text" value={form.first_name} onChange={firstOnChange}/>
                            </FormControl>
                            <FormControl id="last" >
                                <FormLabel>Last Name</FormLabel>
                                <Input bg="gray.50" type="text" value={form.last_name} onChange={lastOnChange}/>
                            </FormControl>
                            <FormControl id="email" >
                                <FormLabel>Email</FormLabel>
                                <Input readOnly bg="gray.50" type="email" value={form.email} onChange={emailOnChange}/>
                            </FormControl>
                            <FormControl id="phone" >
                                <FormLabel>Phone Number</FormLabel>
                                <Input bg="gray.50" type="text" value={form.phone} onChange={phoneOnChange}/>
                            </FormControl>
                        </Stack>

                    </WrapItem>
                </Wrap>
                <Center mt="20px">
                    <Stack>
                    <Button isLoading={loading} onClick={onSubmit} w="sm" bg="blue.700" color="gray.100">Continue to Book</Button>
                    <Button onClick={onCancel} w="sm" >Cancel</Button>
                    </Stack>
                </Center>
            </Stack>
        </Container>
    );
}