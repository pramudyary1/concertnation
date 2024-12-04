import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
  } from '@chakra-ui/react';
  import img from "../asset/img/konser.jpg"
  
  export default function Hero() {
    return (
      <Flex
        w={'full'}
        h={'70vh'}
        backgroundImage={
          img
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}>
        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
            <Text
              color={'white'}
              fontWeight={700}
              lineHeight={1.2}
              align="center"
              fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
              Enliven your life and feel the heartbeat of music at every concert
            </Text>
          </Stack>
        </VStack>
      </Flex>
    );
  }