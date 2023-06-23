import React, { useState } from 'react';
import { account } from '../appwrite/appwriteConfig';
import { useNavigate } from 'react-router-dom';
import { 
    Button,
    Card, CardHeader, CardBody, CardFooter,
    Stack,
    Heading,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Container,
    Box,  
    } from '@chakra-ui/react';
import {
    Input,
    InputGroup,
    InputRightElement,
    } from "@chakra-ui/input"
      

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const loginUser = async (e) => {
        e.preventDefault()
        try {
            await account.createEmailSession(user.email, user.password);
            navigate('/profile') 
        } catch (error) {
            console.log(error);
        }

    }
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    
    const [input, setInput] = useState('')
    
    // const handleInputChange = (e) => setInput(e.target.value)
    
    const isError = input === ''

  return (
        <Container
        backgroundImage="url('/images/kyuubi.png')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        >
        <Card maxW='sm'>
            <CardBody>
                
                <Stack mt='6' spacing='3'>
                <Heading size='md'>Welcome!</Heading>
                <FormControl isInvalid={isError}>
                <FormLabel>Email</FormLabel>
                <Input 
                    type='email'  
                    id='email'
                    name='email'
                    autoComplete='email'
                    required
                    onChange={(e) => { 
                        setUser({
                        ...user,
                        email: e.target.value
                    })}}
                />
                {!isError ? (
                    <FormHelperText>
                    Enter the email youd like to receive the newsletter on.
                    </FormHelperText>
                ) : (
                    <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
                </FormControl>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        id='password'
                        name='password'
                        onChange={(e) => { 
                        setUser({
                        ...user,
                        password: e.target.value
                    })}}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Box>
                    <a
                    href='/signup'
                    >
                        Dont have an account, Sign Up!
                    </a>
                </Box>
            </Stack>
            </CardBody>
            
            <CardFooter>
                
                <Button 
                    variant='solid' 
                    colorScheme='blue'
                    type='submit'
                    onClick={loginUser}
                >
                    Sign In
                </Button>
                
            </CardFooter>
        </Card>
    </Container>  
  )
}

export default Login
