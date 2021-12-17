import React,{useRef , useState} from 'react'
import { Form , Button ,Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Container } from 'react-bootstrap';

export default function ForgetPassword() {
    const emailRef = useRef()
    const {resetPassword} = useAuth()
    const [error, setError] = useState('')
    const [loading , setLoading] = useState(false)
    const [message , setMessage] = useState('')

    async function handleSubmit (event){
        event.preventDefault()
        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('check your inbox for the password')
        }catch {
            setError('Failed to ResetPassword')
        }
        setLoading(false)
    }

    return (
        <>
         <Container className='d-flex align-items-center justify-content-center' style={{minHeight: '100vh'}}>
            <div className='w-100' style={{maxWidth:'400px'}}>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Password Reset</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    {message && <Alert variant='success'>{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Button disabled={loading} className='w-100 mt-4' type="submit">
                            Reset Password
                        </Button>
                    </Form>
                    <div className='w-100 text-center mt-2'>
                        <Link to="/signin">Login</Link>
                    </div>
                </Card.Body>
            </Card>  
            <div className='w-100 text-center mt-2'>
                Need an account? <Link to="/signup">SignUp</Link>
            </div>
        </div>
         </Container>
        </>
    )
}
