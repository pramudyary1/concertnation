import { Button, Container, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import img from "../asset/img/complete.png"
export default function Complete(){
    const navigate = useNavigate()
    const onSubmit = () => {
        navigate("/")
    }
    return (
        <Container>
            <Stack mt="20px" spacing="5" align="center" justify="center">
                <Heading fontSize={"3xl"} color="blue.800">Yay! Completed</Heading>
                <Image src={img} ></Image>
                <Text w="sm" textAlign={"center"} fontSize={"lg"} color="gray.400">We will inform you via email later once the transaction has been accepted</Text>
                <Button onClick={onSubmit} w="200px" bg="blue.700" color="gray.100">Back To Home</Button>
            </Stack>
        </Container>
    );
}