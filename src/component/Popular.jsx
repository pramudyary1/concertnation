import { Flex, Heading, HStack, Image, Skeleton, Stack, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";
import noimg from "../asset/img/noimg.jpg"

export default function Popular(){
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    
    const [data,setData] = useState([]);

    const loadData = () => {
      setLoading(true)
      axios.get(API_URL+'popular')
      .then(res => {setData(res.data.data); setLoading(false);console.log(res) })
    }

    useEffect(() => {
      loadData()
    }, [])
    
    return (
        <Stack spacing={5} py={5} px={10} bg="#012E67" >
            <Heading color="gray.100" fontSize={"2xl"}>Popular Event</Heading>
            <HStack spacing="5">
            {
                data.map( (x,i)=> (
                    <Skeleton isLoaded={!loading}>

                    <HStack maxW={"30%"}>
                        <Heading color="gray.100" fontSize={"7xl"} zIndex="100">{i+1}</Heading>
                        {/* <Flex
                            w={8}
                            h={8}
                            mx="1"
                            mt="1"
                            
                            align={'center'}
                            justify={'center'}
                            color={'white'}
                            rounded={'full'}
                            bg={'blue.200'}
                            fontSize="2xl"
                            position={"absolute"}
                        >
                        </Flex> */}
                        <Link to={"/detail/"+x.id}>
                            <Image
                                w="80%"
                                src={ x.images.length > 0 ? x.images[0].url : noimg}
                                alt='Green double couch with wooden legs'
                                borderRadius='md'
                                />
                        
                        </Link>
                    </HStack>
                    </Skeleton>
                ))
            }
            </HStack>
        </Stack>
    );
}