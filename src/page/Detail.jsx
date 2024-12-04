import { PlusSquareIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardHeader, Center, Container, Flex, Heading, HStack, Image, Input, InputGroup, InputLeftElement, InputRightElement, Skeleton, Stack, Text, useToast, Wrap, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toCurrency } from "..";
import { API_URL } from "../api";
import noimg from "../asset/img/noimg.jpg"
  

export default function Detail(){
    const navigate = useNavigate();
    const { id } = useParams();

    const [amount, setamount] = useState(0)
    const onAdd = (e) => {
        if(amount == data.stock)
            return toast({
                title: "Failed",
                description: "Stock not enough",
                status: "error",
                duration: 1000,
                isClosable: true,
            })
        setamount(amount +1)
    }
    const onDec = (e) => {
        setamount((amount <= 1 ? 0 : amount - 1))
    }

    const onSubmit = () => {
        localStorage.setItem('order',JSON.stringify(data))
        localStorage.setItem('amount',amount)
        navigate('/booking');
    };

    const toast = useToast()
    const [loading, setLoading] = useState(false)
    
    const [data,setData] = useState([]);

    const loadData = () => {
      setLoading(true)
      axios.get(API_URL+'detail/'+id)
      .then(res => {setData(res.data.data); setLoading(false);console.log(res) })
    }

    useEffect(() => {
      loadData()
    }, [])

    return (
        <Container pt="xl" maxW="5xl" >
            <Stack >
                <Breadcrumb mt="20px">
                        <BreadcrumbItem>
                    <Link to="/">
                            <BreadcrumbLink >Home</BreadcrumbLink>
                    </Link>
                        </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink >ConcertDetail</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                    
                <Center>
                    <Skeleton isLoaded={!loading}>
                    <Stack textAlign={"center"}>
                        <Heading>{data.title}</Heading>
                        <Text fontSize={"lg"}>{data.location}</Text>
                        <HStack >
                            <Image src={ data.images && data.images.length > 0 ? data.images[0].url : noimg} maxH="md"/>
                            <Wrap direction={"column"} maxH={"100%"}>
                                {
                                    data.images?.slice(1).map(x=> (
                                        <WrapItem>
                                            <Image maxH={"220px"} src={ data.images && data.images.length > 0 ? data.images[0].url : noimg} />
                                        </WrapItem>
                                    ))
                                }
                            </Wrap>
                        </HStack>
                        
                    </Stack>
                    </Skeleton>
                </Center>
                <HStack align="start" mt="10">
                    <Stack flex={1} bg="dark"> 
                        <Heading fontSize={"2xl"} color="blue.800">About the event</Heading>
                        <Text>{data.description}</Text>
                    </Stack>
                    <Card flex={1} maxW="300px" color="blue.700">
                        <CardBody>
                            <Stack spacing={5}>
                                <Text>Start Order</Text>
                                <Heading fontSize={"3xl"} color="teal.500">{toCurrency(data.price * amount)}</Heading>
                                <Text>Total Ticket</Text>
                                <InputGroup>
                                    <InputLeftElement h={'full'}>
                                    <Button
                                        onClick={onDec}
                                        variant={'ghost'}
                                        bg="orange.500"
                                        color="gray.200"
                                    >
                                        <FaMinus fontSize={"4xl"}/> 
                                    </Button>
                                    </InputLeftElement>
                                    <Input type={'number'} textAlign="center" isReadOnly={true} value={amount}/>
                                    <InputRightElement h={'full'}>
                                    <Button
                                        onClick={onAdd}
                                        variant={'ghost'}
                                        bg="teal.500"
                                        color="gray.200"
                                    >
                                        <FaPlus fontSize={"4xl"}/> 
                                    </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <Text fontSize={"xs"}>You will pay { toCurrency(data.price * amount)} for {amount} ticket{ amount > 1 ? 's' : ''}</Text>
                                <Button isDisabled={amount < 1} bg="blue.800" color="gray.200" onClick={onSubmit}>
                                    Continue To Book
                                </Button>
                            </Stack>
                        </CardBody>

                    </Card>
                </HStack>
            </Stack>
        </Container>
    );
}