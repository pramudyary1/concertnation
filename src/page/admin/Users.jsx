import { Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardHeader, Container, Heading, Input, Skeleton, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { API_URL, config } from "../../api";
import AppTable, { SelectColumnFilter } from "../../component/AppTable";



export default function Users(){
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  
  const [data,setData] = useState([]);

  const loadData = () => {
    setLoading(true)
    axios.get(API_URL+'user', config())
    .then(res => {setData(res.data.data); setLoading(false);console.log(res) })
  }

  useEffect(() => {
    loadData()
  }, [])
      const columns = useMemo(
        () => [
          {
            Header: "Email",
            accessor: "email",
            Filter: "",
            filter: ""
          },
          {
            Header: "Joined",
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
            Header: "Role",
            accessor: "role",
            Filter: "",
            filter: "",
            disableSortBy: true,
            Cell: ({ row: { original } }) => (
              <Badge
                size={"xs"}
                colorScheme={original.status == "Open" ? "green" : "gray"}
              >
                {original.role}
              </Badge>
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
                        <BreadcrumbLink href='#'>Users</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <CardHeader>
                        <Heading fontSize={"lg"}>Recently Joined</Heading>
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