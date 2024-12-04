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
    useToast,
  } from '@chakra-ui/react';
  import noimg from "../asset/img/noimg.jpg"
  import img from "../asset/img/konser.jpg"
import { CalendarIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../api';
import { toCurrency } from '..';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
  
  const latestItem = (data) => (
    <Skeleton isLoaded={true}>
      <Link to={'/detail/'+data.id}>
        <Card maxW='280px'>
        <CardBody>
            <Image

            src={ data.images.length > 0 ? data.images[0].url : noimg}
            alt='Green double couch with wooden legs'
            borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
            <Flex align="center" justify="space-between">
                <Heading size='sm'>{data.title}</Heading>
                <Text color='gray.500' fontSize='md'>
                  {toCurrency(data.price)}
                </Text>
            </Flex>
            <Stack spacing="0">
                <HStack><FiCalendar/> <Text>{data.date}</Text></HStack>
                <HStack><FiMapPin/> <Text>{data.location}</Text></HStack>
            </Stack>
            </Stack>
        </CardBody>
        </Card>
      </Link>
        
    </Skeleton>
  )

  export default function Latest() {
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    
    const [data,setData] = useState([]);

    const loadData = () => {
      setLoading(true)
      axios.get(API_URL+'latest')
      .then(res => {setData(res.data.data); setLoading(false);console.log(res) })
    }

    useEffect(() => {
      loadData()
    }, [])

    return (
      <Stack spacing={5} py={5} mx={10}>
        <Heading fontSize={"2xl"}>Newest Event</Heading>
        <Skeleton isLoaded={!loading}>
          <HStack spacing="5">
              {
                  data.map( x=> latestItem(x))
              }
              
          </HStack>

        </Skeleton>
      </Stack>
    );
  }