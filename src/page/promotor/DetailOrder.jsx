import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardHeader, Center, Container, Divider, Flex, FormControl, FormLabel, Heading, HStack, Image, Input, Skeleton, Spacer, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toCurrency } from "../..";
import { API_URL, config } from "../../api";
import noimg from "../../asset/img/noimg.jpg"
export default function DetailOrder(){
    const navigate = useNavigate();
    const { id } = useParams();
    
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    
    const [data,setData] = useState([]);

    const loadData = () => {
      setLoading(true)
      axios.get(API_URL+'order/'+id, config())
      .then(res => {setData(res.data.data); setLoading(false);console.log(res) })
      .catch(err=> console.log(err))
    }

    useEffect(() => {
      loadData()
    }, [])

    const onAccept = () => {
        axios.put(API_URL+'order/'+id, {status: 'verified'}, config())
        .then(res => {
            console.log(res)
            toast({
                title: 'Success.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate('/promotor/order')
        })
        .catch(e=> {
            console.log(e);
            toast({
                title: 'Something went wrong.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }
    const onReject = () => {
        axios.put(API_URL+'order/'+id, {status: 'rejected'}, config())
        .then(res => {
            console.log(res)
            toast({
                title: 'Success.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate('/promotor/order')
        })
        .catch(e=> {
            toast({
                title: 'Something went wrong.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }
    
    return (
        <Container maxW="5xl"> 
            <Stack>
                <Breadcrumb>
                    <BreadcrumbItem >
                        <Link to="/promotor/order">
                            <BreadcrumbLink >Data Order</BreadcrumbLink>
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink >Detail Order</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <CardHeader>
                        <Heading fontSize={"lg"}>Detail Order</Heading>
                        <Divider mt="3"/>
                    </CardHeader>
                    <Skeleton isLoaded={!loading}>

                    <CardBody>
                        <Stack spacing={"5"}>
                            <Flex wrap="wrap" gap="5">
                                <FormControl maxW="48%">
                                    <FormLabel>Name</FormLabel>
                                    <Input value={data.user?.first_name+' '+data.user?.last_name}/>
                                </FormControl>
                                <FormControl maxW="48%">
                                    <FormLabel>Total</FormLabel>
                                    <Input value={ toCurrency(data.total)}/>
                                </FormControl>
                                <FormControl  maxW="48%">
                                    <FormLabel>Payment Type</FormLabel>
                                    <Input value={data.payment_type}/>
                                </FormControl>
                                {
                                    data.payment_type == 'e-wallet'? 
                                    (<>
                                        <FormControl  maxW="48%">
                                            <FormLabel>Service Name</FormLabel>
                                            <Input value={data.bank_name}/>
                                        </FormControl>
                                    </>) : (<>
                                        <FormControl  maxW="48%">
                                            <FormLabel>Bank Name</FormLabel>
                                            <Input value={data.bank_name}/>
                                        </FormControl>
                                        <FormControl  maxW="48%">
                                            <FormLabel>Account Name</FormLabel>
                                            <Input value={data.account_name}/>
                                        </FormControl>
                                    </>)
                                }
                            </Flex>
                            <Center>
                                <Stack  spacing="1" textAlign={"center"}>
                                    { data.image != null && (
                                        <Image src={data.image?.url} maxW="md"/>
                                    ) }
                                </Stack>
                            </Center>
                            {
                                data.status === "pending" &&
                                <HStack flex={1} bg="dark" px="20px" mt="5px">
                                    <Spacer/>
                                    <HStack>
                                        <Button onClick={onReject} size={"sm"} bg="orange.400" color="gray.100" w={"150px"}>Reject</Button>
                                        <Button onClick={onAccept} size={"sm"} bg="blue.700" color="gray.100"w={"150px"}>Accept</Button>
                                    </HStack> 
                                </HStack>
                            }
                        </Stack>

                    </CardBody>
                    </Skeleton>
                </Card>
            </Stack>
        </Container>
    );
}