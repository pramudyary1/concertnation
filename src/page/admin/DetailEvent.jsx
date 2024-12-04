import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardHeader, Center, Container, Divider, Heading, HStack, Image, Skeleton, Spacer, Stack, Text, useToast, Wrap, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toCurrency } from "../..";
import { API_URL, config } from "../../api";
import noimg from "../../asset/img/noimg.jpg"
export default function DetailEvent(){
    const navigate = useNavigate()
    const { id } = useParams();
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    
    const [data,setData] = useState([]);

    const loadData = () => {
      setLoading(true)
      axios.get(API_URL+'event/'+id, config())
      .then(res => {setData(res.data.data); setLoading(false);console.log(res) })
    }

    const onReject = () => {
        axios.post(API_URL+'event/publish/'+id, { is_deleted : 1 }, config())
        .then(res => {
            console.log(res)
            toast({
                title: 'Success.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate('/admin/promotors')
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

    const onAccept = () => {
        axios.post(API_URL+'event/publish/'+id, { is_published : 1 }, config())
        .then(res => {
            console.log(res)
            toast({
                title: 'Success.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            navigate('/admin/promotors')
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

    useEffect(() => {
      loadData()
    }, [])

    return (
        <Container maxW="5xl"> 
            <Stack>
                <Breadcrumb>
                    <BreadcrumbItem >
                        <Link to="/admin/promotors">
                            <BreadcrumbLink >Promotor</BreadcrumbLink>
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink >Detail Event</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <CardHeader>
                        <Heading fontSize={"lg"}>Detail Event</Heading>
                        <Divider mt="3"/>
                    </CardHeader>
                    <Skeleton isLoaded={!loading}>
                        <CardBody>
                            <Stack spacing={"5"}>
                                <Center>
                                    <Stack  spacing="1" textAlign={"center"}>
                                        <Heading color="blue.900" fontSize={"3xl"}>{data.title}</Heading>
                                        <Text color="gray.400" fontSize={"lg"}>{data.location}</Text>
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
                                </Center>
                                <Stack flex={1} bg="dark" px="20px" mt="5px"> 
                                    <Heading fontSize={"xl"} color="blue.800">About the event</Heading>
                                    <Text>{data.description}</Text>
                                </Stack>
                                <HStack flex={1} bg="dark" px="20px" mt="5px">
                                    <Stack>
                                        <Heading fontSize={"lg"} color="blue.800">Price</Heading>
                                        <Text fontWeight={"semibold"}>{ toCurrency(data.price) }</Text>
                                    </Stack>
                                    <Spacer/>
                                    <HStack visibility={ data.is_published == 0 && data.is_deleted == 0 ? 'visible' : 'hidden' }>
                                        <Button onClick={onReject} size={"sm"} bg="orange.400" color="gray.100" w={"150px"}>Reject</Button>
                                        <Button onClick={onAccept} size={"sm"} bg="blue.700" color="gray.100"w={"150px"}>Accept</Button>
                                    </HStack> 
                                </HStack>
                            </Stack>

                        </CardBody>
                    </Skeleton>
                </Card>
            </Stack>
        </Container>
    );
}