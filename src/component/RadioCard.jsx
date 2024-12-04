import { Box, useRadio } from "@chakra-ui/react";

function RadioCard(props) {
    const { getInputProps, getRadioProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getRadioProps()
  
    return (
      <Box as='label' flex="1" >
        <input {...input} />
        <Box
        w="100%"
        align="center"
          {...checkbox}
          cursor='pointer'
        //   borderWidth='1px'
          borderRadius='md'
          boxShadow='md'
          _checked={{
            bg: 'blue.400',
            color: 'white',
            borderColor: 'blue.600',
          }}
          px={5}
          py={2}
        >
          {props.children}
        </Box>
      </Box>
    )
  }

  export default RadioCard;
