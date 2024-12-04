import {
    Flex,
    Box,
    Heading,
    Stack
  } from '@chakra-ui/react';
import { useEffect } from 'react';
import { createBrowserRouter, Outlet, Route, RouterProvider, Routes, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Homepage from './Homepage';


function UserPage() {
    return (
        <Stack spacing={0} >
            <Navbar></Navbar>
            <Outlet/>
        </Stack>
    );
  }
  
  export default UserPage;
  