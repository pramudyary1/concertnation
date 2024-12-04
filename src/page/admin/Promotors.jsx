import { Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardHeader, Container, Heading, Input, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { API_URL, config } from "../../api";
import AppTable, { SelectColumnFilter } from "../../component/AppTable";



export default function Promotors(){
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  
  const [data,setData] = useState([]);

  const loadData = () => {
    setLoading(true)
    axios.get(API_URL+'event', config())
    .then(res => {setData(res.data.data); setLoading(false);console.log(res) })
  }

  useEffect(() => {
    loadData()
  }, [])
    
      const columns = useMemo(
        () => [
          {
            Header: "Event Name",
            accessor: "title",
            Filter: "",
            filter: ""
          },
          {
            Header: "Promotor",
            accessor: "user.email",
            Filter: "",
            filter: ""
          },
          {
            Header: "Status",
            accessor: "status",
            Filter: "",
            filter: "",
            disableSortBy: true,
            Cell: ({ row: { original } }) => (
              <Badge
                size={"xs"}
                colorScheme={original.status == "Open" ? "green" : "gray"}
              >
                {original.is_published ? 'Publised' : original.is_deleted ? 'Rejected' : 'Pending'}
              </Badge>
            )
          },
          {
            Header: "",
            accessor: "action",
            Filter: "",
            filter: "",
            disableSortBy: true,
            Cell: ({ row: { original } }) => (
              <Link to={"/admin/event/"+original.id}>
                <Button
                    colorScheme="gray"
                    size={"sm"}
                >
                    Detail Event
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
                        <BreadcrumbLink href='#'>Promotors</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <CardHeader>
                        <Heading fontSize={"lg"}>Request Event</Heading>
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