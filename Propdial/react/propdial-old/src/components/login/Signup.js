import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Signup() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const PasswordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== PasswordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        // try {
        setError("");
        setLoading(true);
        signup(emailRef.current.value, passwordRef.current.value)
            .then(() => {
                console.log('signup');
            })
            .catch((error) => {
                console.log(error);
                setError('Failed to create an account 1', error);
            });
        // }
        // catch (error) {
        //     setError('Failed to create an account 2', error);
        // }

        setLoading(false);

    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={PasswordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className='w-100' type='submit'>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Already have an account? <Link to="/login">Login In</Link>
            </div>
        </>
    )
}
