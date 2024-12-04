import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
    HStack,
    useColorModeValue,
    Box,
    Image,
    Heading,
    Card,
    CardBody,
    Divider,
    CardFooter,
    ButtonGroup,
    Skeleton,
    Link,
    Wrap,
    WrapItem,
    useToast,
  } from '@chakra-ui/react';
  import noimg from "../asset/img/noimg.jpg"
  import img from "../asset/img/konser.jpg"
import { CalendarIcon } from '@chakra-ui/icons';
import{Link as RouterLink} from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../api';
import { toCurrency } from '..';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
  
  const featuredItem = (data) => (
    <RouterLink to={'/detail/'+data.id}>
    <Card w='300px'>
        <CardBody>
            <Image
            src={ data.images.length > 0 ? data.images[0].url : noimg}
            alt='Green double couch with wooden legs'
            borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
            <Flex align="center" justify="space-between">
                <Heading size='sm'>{data.title}</Heading>
            </Flex>
            <Stack spacing="0">
                <HStack><FiCalendar/> <Text>{data.date}</Text></HStack>
                <HStack><FiMapPin/> <Text>{data.location}</Text></HStack>
            </Stack>
            <Flex justify="right">
                <Text color='gray.500' fontSize='md'>
                    {toCurrency(data.price)}
                </Text>
            </Flex>
            </Stack>
        </CardBody>
        </Card>
    </RouterLink>
        
  )

  export default function Featured() {
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    
    const [data,setData] = useState([]);

    const loadData = () => {
      setLoading(true)
      axios.get(API_URL+'featured')
      .then(res => {setData(res.data.data); setLoading(false);console.log(res) })
    }

    useEffect(() => {
      loadData()
    }, [])

    return (
      <Stack spacing={5} py={5} mx={10} >
        <HStack spacing="7">
            <Heading fontSize={"2xl"}>All Events</Heading>
            {/* <Link color={"blue.300"}>See more..</Link> */}
        </HStack>
        <Wrap spacing="5">
            {
                data.map( x=> (
                    <Skeleton isLoaded={true}>
                    <WrapItem>
                        {featuredItem(x)}
                    </WrapItem>
                    </Skeleton>
                ))
            }
        </Wrap>
      </Stack>
    );
  }