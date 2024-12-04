import { Badge, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardHeader, Container, Flex, FormControl, FormLabel, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Spacer, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { FiDelete, FiEdit, FiEdit2, FiPenTool, FiPlus, FiTrash, FiTrash2 } from "react-icons/fi";
import { API_URL, config, configForm } from "../../api";
import AppTable, { SelectColumnFilter } from "../../component/AppTable";
import noimg from "../../asset/img/noimg.jpg"

export default function Events(){
    const [formData, setFormData] = useState({
      id:null,
      user_id : JSON.parse(localStorage.getItem('user'))['id'],
      title: "",
      description: "",
      location: "",
      date: "",
      time: "",
      price: "",
      stock: "",
    })
    const [images, setImages] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()
    const [formLoading, setFormLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const titleOnChange = (e) => {
        setFormData({ ...formData,title:e.target.value})
    }
    const descriptionOnChange = (e) => {
        setFormData({ ...formData,description:e.target.value})
    }
    const locationOnChange = (e) => {
      setFormData({ ...formData,location:e.target.value})
    }
    const dateOnChange = (e) => {
      setFormData({ ...formData,date:e.target.value})
    }
    const timeOnChange = (e) => {
      setFormData({ ...formData,time:e.target.value})
    }
    const priceOnChange = (e) => {
      setFormData({ ...formData,price:e.target.value})
    }
    const stockOnChange = (e) => {
      setFormData({ ...formData,stock:e.target.value})
    }
    const imageOnChange = (e) => {
      setImages(e.target.files)
    }

    const onEdit=(data)=>{
      setFormData({...data})
      onOpen()
    }
    const onAdd=(data)=>{
      onOpen()
    }
    const onDelete=(data)=>{
      axios.delete(API_URL+'event/'+data.id, config())
      .then(res=>{
          toast({
              title: 'Success.',
              description: "Event deleted",
              status: 'success',
              duration: 9000,
              isClosable: true,
          })
          loadData()
        } 
        )
      .catch(e => 
          toast({
              title: 'Something went wrong.',
              description: "Please try again later",
              status: 'error',
              duration: 9000,
              isClosable: true,
          })
        )
    }
    const [data,setData] = useState([])
    
    const onSave =  () => {
      setFormLoading(true)

      const form = new FormData();
      console.log(images)
      Array(images.length).fill('').map((x,i) => {
        form.append("images[]", images[i])
      })
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value)
      });

      console.log(form);
      
      if(formData.id)
        axios.post(API_URL+'event/'+formData.id+'?_method=put', form, configForm())
        .then(res=>{
            toast({
                title: 'Success.',
                description: "Event edited successfully",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            onClose()
            resetForm()
            loadData()
          } 
          )
        .catch(e =>
            toast({
                title: 'Something went wrong.',
                description: "Please try again later",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
          )
        .finally(() => setFormLoading(false))
      else 
        axios.post(API_URL+'event', form, configForm())
        .then(res=>{
            toast({
                title: 'Success.',
                description: "Event added successfully",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            onClose()
            resetForm()
            loadData()
          }
          )
        .catch(e => 
            toast({
                title: 'Something went wrong.',
                description: "Please try again later",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
          )
        .finally(() => setFormLoading(false))
    }

    const resetForm = () => {
      setFormData(
        {
          id:null,
          user_id : JSON.parse(localStorage.getItem('user'))['id'],
          title: "",
          description: "",
          location: "",
          date: "",
          time: "",
          price: "",
          stock: "",
        }
      )
    }

    const loadData = () => {
      setLoading(true)
      axios.get(API_URL+'event', config())
      .then(res => {setData(res.data.data); setLoading(false) })
    }

    useEffect(() => {
      loadData()
    }, [])

    useEffect(() => {
      console.log(formData)
    }, [formData])

      const columns = useMemo(
        () => [
          {
            Header: "Cover",
            accessor: "image",
            Filter: "",
            filter: "",
            disableSortBy: true,
            Cell: ({ row: { original } }) => 
              (
                <Image src={original.images.length < 1? noimg : original.images[0].url} maxW="100px"/>
              )
          },
          {
            Header: "Name",
            accessor: "title",
            Filter: "",
            filter: ""
          },
          {
            Header: "Date",
            accessor: "date",
            Filter: "",
            filter: ""
          },
          {
            Header: "Stock",
            accessor: "stock",
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
              <Flex gap={1}>
                <Button
                  colorScheme="teal"
                  size={"sm"}
                  onClick={() => onEdit(original)}
                >
                  <FiEdit2/>
                </Button>
                <Button
                  colorScheme="red"
                  size={"sm"}
                  onClick={() => onDelete(original)}
                >
                  <FiTrash2/>
                </Button>
              
              </Flex>
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
                        <BreadcrumbLink href='#'>Events</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <CardHeader>
                        <HStack>
                          <Heading fontSize={"lg"}>Promoted Events</Heading>
                          <Spacer/>
                          <Button onClick={onAdd} colorScheme={"blue"}  leftIcon={<FiPlus/>}>
                            Add
                          </Button>
                        </HStack>
                    </CardHeader>
                    <CardBody>
                    <Skeleton isLoaded={!loading}>
                        <AppTable columns={columns} data={data} searchEnabled={true} />
                    </Skeleton>
                    </CardBody>
                </Card>
            </Stack>

            <Modal isOpen={isOpen} onClose={ () => {onClose(); resetForm()}}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{ formData.id ? "Edit Event" : "Add Event" }</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack>
                    <FormControl>
                      <FormLabel>Title</FormLabel>
                      <Input value={formData.title} onChange={titleOnChange} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Input value={formData.description} onChange={descriptionOnChange} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Location</FormLabel>
                      <Input value={formData.location} onChange={locationOnChange} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Date</FormLabel>
                      <Input value={formData.date} onChange={dateOnChange} type="date"/>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Time</FormLabel>
                      <Input value={formData.time} onChange={timeOnChange} />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Price</FormLabel>
                      <Input value={formData.price} onChange={priceOnChange} type="number"/>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Stock</FormLabel>
                      <Input value={formData.stock} onChange={stockOnChange} type="number"/>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Image</FormLabel>
                      <Input multiple  onChange={imageOnChange} type="file"  accept="image/png, image/jpg, image/jpeg"/>
                    </FormControl>
                  </Stack>
                </ModalBody>

                <ModalFooter>
                  <Button isLoading={formLoading} colorScheme='blue'  onClick={onSave}>
                    Save
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
        </Container>
    );
}