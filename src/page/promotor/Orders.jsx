import { Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardHeader, Container, Heading, Input, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { toCurrency } from "../..";
import { API_URL, config } from "../../api";
import AppTable, { SelectColumnFilter } from "../../component/AppTable";



export default function Orders(){
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    
    const [data,setData] = useState([]);

    const loadData = () => {
      setLoading(true)
      let id = JSON.parse(localStorage.getItem('user'))['id']
      axios.get(API_URL+'promotor/order/'+id, config())
      .then(res => {setData(res.data.data); setLoading(false);console.log(res) })
      .catch(err=> console.log(err))
    }

    useEffect(() => {
      loadData()
    }, [])
    
      const columns = useMemo(
        () => [
          {
            Header: "Buyer",
            accessor: "name",
            Filter: "",
            filter: "",
            Cell: ({ row: { original } }) => `${original.user.first_name} ${original.user.last_name}`
          },
          {
            Header: "Event",
            accessor: "event",
            Filter: "",
            filter: "",
            Cell: ({ row: { original } }) => `${original.event.title}`
          },
          {
            Header: "Total",
            accessor: "total",
            Filter: "",
            filter: "",
            Cell: ({ row: { original } }) => toCurrency(original.total)
          },
          {
            Header: "Type",
            accessor: "payment_type",
            Filter: "",
            filter: ""
          },
          {
            Header: "Status",
            accessor: "status",
            Filter: "",
            filter: "",
            Cell: ({ row: { original } }) => (<Badge> {original.status} </Badge>)
          },
          {
            Header: "",
            accessor: "action",
            Filter: "",
            filter: "",
            disableSortBy: true,
            Cell: ({ row: { original } }) => (
              <Link to={"/promotor/order/"+original.id}>
                <Button
                    colorScheme="teal"
                    size={"sm"}
                >
                    Detail
                </Button>
              </Link>
            )
          }
        ],
        []
      );
    
    return (
        <Container maxW="5xl">
            <Stack spacing="5">
                <Breadcrumb>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink href='#'>Data Order</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <CardHeader>
                        <Heading fontSize={"lg"}>Order</Heading>
                    </CardHeader>
                    <CardBody>
                      <Skeleton isLoaded={!loading}>
                        <AppTable columns={columns} data={data} searchEnabled={true} />
                      </Skeleton>
                    </CardBody>
                </Card>
            </Stack>
        </Container>
    );
}