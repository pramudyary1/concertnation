import { ChakraProvider, ColorModeScript,theme } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './page/Login';
import Register from './page/Register';
import UserPage from './page/UserPage';
import Homepage from './page/Homepage';
import Detail from './page/Detail';
import Booking from './page/Booking';
import AdminPage from './page/admin/AdminPage';
import Dashboard from './page/admin/Dashboard';
import Users from './page/admin/Users';
import Promotors from './page/admin/Promotors';
import DetailEvent from './page/admin/DetailEvent';
import PromotorPage from './page/promotor/PromotorPage';
import DashboardPromotor from './page/promotor/DashboardPromotor';
import Events from './page/promotor/Events';
import Orders from './page/promotor/Orders';
import DetailOrder from './page/promotor/DetailOrder';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserPage/>,
    children: [
      {
        path: "/",
        element: <Homepage/>,
      },
      {
        path: "/detail/:id",
        element: <Detail/>,
      },
      {
        path: "/booking",
        element: <Booking/>,
      }  
    ]
  },
  {
    path: "/admin",
    element: <AdminPage/>,
    children: [
      {
        path: "/admin",
        element: <Dashboard/>,
      },
      {
        path: "/admin/users",
        element: <Users/>,
      },
      {
        path: "/admin/promotors",
        element: <Promotors/>,
      },
      {
        path: "/admin/event/:id",
        element: <DetailEvent/>,
      }    
    ]
  },
  {
    path: "/promotor",
    element: <PromotorPage/>,
    children: [
      {
        path: "/promotor",
        element: <DashboardPromotor/>,
      },
      {
        path: "/promotor/event",
        element: <Events/>,
      },
      {
        path: "/promotor/order",
        element: <Orders/>,
      },
      {
        path: "/promotor/order/:id",
        element: <DetailOrder/>,
      }    
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },  
]);

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);

export function toCurrency(amount){
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
