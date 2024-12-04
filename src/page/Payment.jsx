import { Container, Image, Heading, HStack, Stack, Text, Divider, Flex, FormControl, FormLabel, Input, Wrap, WrapItem, Button, Center, Box, Select, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import noimg from "../asset/img/noimg.jpg"
import bca from "../asset/img/bca.jpg"
import mandiri from "../asset/img/mandiri.jpg"
import { toCurrency } from "..";
import axios from "axios";
import { API_URL, config, configForm } from "../api";

export default function Payment(props){
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    
    const data =  props.data
    const amount =  props.amount
    const user = props.user
    
    const [type, settype] = useState('')
    const typeOnChange = (e) => {
        settype(e.target.value)
    }
    const [bank, setbank] = useState('')
    const bankOnChange = (e) => {
        setbank(e.target.value)
    }
    const [account, setaccount] = useState('')
    const accountOnChange = (e) => {
        setaccount(e.target.value)
    }
    const [proof, setproof] = useState('')
    const proofOnChange = (e) => {
        setproof(e.target.files[0])
    }

    const onSubmit = (e) => {
        setLoading(true)
        let req = {
            event_id: data.id, 
            user_id : user.id, 
            quantity: parseInt(amount),
            payment_type: type,
            bank_name: bank,
            account_name: account,
            image: proof
        }
        console.log(req)
        axios.post(API_URL+'order', req, configForm())
        .then(res=> {
            console.log(res)
            localStorage.removeItem('order')
            localStorage.removeItem('amount')
            props.setIndex(3)
        })
        .catch(err => {
            console.log(err);
            toast({
                title: 'Something went wrong',
                status: 'error',
                isClosable: true,
                duration: 1000
            })
        })
        .finally(() => setLoading(false))
    }
    const onCancel = (e) => {
        navigate("/")
    }

    return (
        <Container pt="xl" maxW="6xl">
            <Stack spacing="5">
                <Stack textAlign={"center"} mt="20px">
                    <Heading fontSize={"3xl"} color="blue.800">Payment</Heading>
                    <Text fontSize={"lg"} color="gray.400">Kindly follow the instructions below</Text>
                </Stack>
                <Wrap w="100%" spacing={8} >
                    <WrapItem w="380px">
                        <Stack spacing="5">
                            <Text>Payment Transfer:</Text>
                            <Text>Tax : 5%</Text>
                            <Flex>Sub total : <Box color="blue.800">&nbsp;{toCurrency(data.price * amount)}</Box></Flex>
                            <Flex>Total : <Box color="blue.800">&nbsp;{toCurrency(((data.price * amount) * 5/100) + (data.price * amount) )}</Box></Flex>
                            <HStack align="start">
                                <Image src={bca} maxW="50px"></Image>
                                <Stack  spacing="0">
                                    <Text>Bank Central Asia</Text>
                                    <Text>2208 1996</Text>
                                    <Text>Wawan Kurniawan</Text>
                                </Stack>
                            </HStack>
                            <HStack align="start">
                                <Image src={mandiri} maxW="50px"></Image>
                                <Stack  spacing="0">
                                    <Text>Bank Central Asia</Text>
                                    <Text>2208 1996</Text>
                                    <Text>Wawan Kurniawan</Text>
                                </Stack>
                            </HStack>
                        </Stack>
                    </WrapItem>
                    <WrapItem>
                    <Divider orientation='vertical' />
                    </WrapItem>
                    <WrapItem flex="1">
                        <Stack w="100%">
                            <FormControl id="first"   >
                                <FormLabel>Select Payment</FormLabel>
                                <Select bg="gray.50" placeholder='Payment' value={type} onChange={typeOnChange}>
                                    <option value='bank'>Bank Transfer</option>
                                    <option value='e-wallet'>E-wallet</option>
                                </Select>
                            </FormControl>
                            {
                                (type == '') ? null : 
                                (type == 'bank') ? (
                                    <>
                                    <FormControl id="last" >
                                        <FormLabel>Upload the proof of transfer</FormLabel>
                                        <Input bg="gray.50" type="file" onChange={proofOnChange}/>
                                    </FormControl>
                                    <FormControl id="bank" >
                                        <FormLabel>Bank</FormLabel>
                                        <Select bg="gray.50" placeholder='Bank' value={bank} onChange={bankOnChange}>
                                            <option value='bca'>BCA</option>
                                            <option value='mandiri'>Mandiri</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl id="phone" >
                                        <FormLabel>Name</FormLabel>
                                        <Input bg="gray.50" type="text" value={account} onChange={accountOnChange}/>
                                    </FormControl>
                                    </>
                                ) : 
                                (
                                    <FormControl id="bank" >
                                        <FormLabel>Service</FormLabel>
                                        <Select bg="gray.50" placeholder='Wallet' value={bank} onChange={bankOnChange}>
                                            <option value='dana'>Dana</option>
                                            <option value='gopay'>Gopay</option>
                                            <option value='shopeepay'>Shopeepay</option>
                                        </Select>
                                    </FormControl>
                                )
                            }
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