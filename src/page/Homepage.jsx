import {
    Flex,
    Box,
    Heading,
    Stack
  } from '@chakra-ui/react';
import Featured from '../component/Featured';
import Footer from '../component/Footer';
import Hero from '../component/Hero';
import Latest from '../component/Latest';
import Popular from '../component/Popular';

function Homepage() {
    return (
        <Stack bg="gray.50">
            <Hero/>
            <Latest/>
            <Popular/>
            <Featured/>
            <Footer/>
        </Stack>
    );
  }
  
  export default Homepage;
  