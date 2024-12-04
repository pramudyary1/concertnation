import { Box, Center, Container, Step, StepDescription, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle, useSteps, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Complete from "./Complete";
import OrderInfo from "./OrderInfo";
import Payment from "./Payment";

const steps = [
    {   },
    {   },
    {   },
  ]

export default function Booking(){
    const navigate = useNavigate()
    const toast =  useToast()
    const [data, setData] = useState({})
    const [amount, setamount] = useState(0)
    const [user, setuser] = useState(0)
    
    
    useEffect(()=> {
        if(!localStorage.getItem('user')){
            toast({
                title: 'Please login first.',
                status: 'info',
                duration: 9000,
                isClosable: true,
            })
            navigate('/login')
        } 
        if(!localStorage.getItem('order'))
            navigate('/')
        setData(JSON.parse(localStorage.getItem('order')))
        setamount(localStorage.getItem('amount'))
        setuser(JSON.parse(localStorage.getItem('user')))
    },[])
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
      })

    return (
        <Container mt="20px" maxW="4xl">
             <Container>
                <Stepper size='lg' index={activeStep} >
                {steps.map((step, index) => (
                    <Step key={index}>
                    <StepIndicator>
                        <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                        />
                    </StepIndicator>

                    <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                    </Box>

                    <StepSeparator />
                    </Step>
                ))}
                </Stepper>
             </Container>
            {
                (activeStep == 0) ? <OrderInfo user={user} data={data} amount={amount} setIndex={setActiveStep}/> : (activeStep == 1) ? <Payment user={user} amount={amount} data={data} setIndex={setActiveStep}/> : <Complete/>  
            }
        </Container>
    );
}