import { Badge, Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Card, CardBody, CardHeader, Container, Flex, Heading, HStack, Image, SimpleGrid, Skeleton, Spacer, Stack, Stat, StatLabel, StatNumber, Text, useColorModeValue, useToast, Wrap, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FiBarChart, FiCalendar, FiUser } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toCurrency } from "../..";
import { API_URL, config } from "../../api";
import img from "../../asset/img/noimg.jpg"
import AppTable from "../../component/AppTable";
const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
]  


function StatsCard(props) {
    const { title, stat, icon } = props;
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={'5'}
        shadow={'xl'}
        border={'1px solid'}
        borderColor={useColorModeValue('gray.800', 'gray.500')}
        rounded={'lg'}>
        <Flex justifyContent={'space-between'}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={'medium'} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={'auto'}
            color={useColorModeValue('gray.800', 'gray.200')}
            alignContent={'center'}>
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }

export default function DashboardPromotor(){
    
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    
    const [data,setData] = useState([]);

    const loadData = () => {
        setLoading(true)
        axios.get(API_URL+'dashboard/promotor/'+JSON.parse(localStorage.getItem('user'))['id'], config())
        .then(res => {setData(res.data.data); setLoading(false);console.log(res) })
    }

    useEffect(() => {
        loadData()
    }, [])

    const columns = useMemo(
        () => [
          {
            Header: "Name",
            accessor: "name",
            Filter: "",
            filter: "",
            Cell: ({ row: { original } }) => `${original.user.first_name} ${original.user.last_name}`
          },
          {
            Header: "Date",
            accessor: "created_at",
            Filter: "",
            filter: "",
            Cell: ({ row: { original } }) => new Date(original.created_at).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          },
          {
            Header: "Status",
            accessor: "action",
            Filter: "",
            filter: "",
            disableSortBy: true,
            Cell: ({ row: { original } }) => (
                <Badge
                size={"sm"}
                >
                    {original.status}
                </Badge>
            )
        },
        {
          Header: "Amount",
          accessor: "total",
          Filter: "",
          filter: "",
          Cell: ({ row: { original } }) => toCurrency(original.total)
        },
        ],
        []
      );

    return (
        <Container maxW="5xl" >
            <Stack spacing="10">
                <Breadcrumb>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'>Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                    <Skeleton isLoaded={!loading}>
                        <StatsCard
                        title={'Buyers'}
                        stat={data.buyer}
                        icon={<FiUser size={"3em"} />}
                        />
                    </Skeleton>
                    <Skeleton isLoaded={!loading}>
                    <StatsCard
                    title={'Events'}
                    stat={data.event}
                    icon={<FiCalendar size={"3em"}/>}
                    />
                    </Skeleton>
                    <Skeleton isLoaded={!loading}>
                    <StatsCard
                    title={'Sales This Month'}
                    stat={data.order}
                    icon={<FiBarChart size={"3em"}/>}
                    />
                    </Skeleton>
                    
                </SimpleGrid>
                <Flex wrap={"wrap"}>  
                    <Card mx="3" mt="2" maxW="400px" flex="1" h="fit-content">
                        <CardHeader>
                            <Heading fontSize={"md"}>Total Sales</Heading>
                        </CardHeader>
                        <Skeleton isLoaded={!loading}>
                            <CardBody>

                            <LineChart
                            width={350}
                            height={300}
                            data={data.sales}
                            margin={{
                                top: 5,
                                right: 0,
                                left: 0,
                                bottom: 5,
                            }}
                            >
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                            </CardBody>
                        </Skeleton>
                    </Card>
                        <Card flex="1" mx="3" mt="2">
                            <CardHeader>
                                <Heading fontSize={"md"}>Recent Payment</Heading>
                            </CardHeader>
                            <Skeleton isLoaded={!loading}>
                                <CardBody>
                                    <AppTable columns={columns} data={data.payment ? data.payment: []} searchEnabled={false} />
                                </CardBody>
                            </Skeleton>
                        </Card>
                    {/* </WrapItem> */}
                </Flex>
            </Stack>
        </Container>
    );
}