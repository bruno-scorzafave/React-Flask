import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';

function SignUpForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {register, handleSubmit, watch, formState: { errors }} = useForm();

    const submitForm = (e) => {
        e.preventDefault();
        
        console.log('Form submitted:', { username, email, password, confirmPassword });
        
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    console.log(watch("username")); // watch input value by passing the name of it

  return (
    <Form className="mt-3">
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter username"
            {...register('username', { required: true, maxLength:25 }) }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
            type="email"
            placeholder="Enter email"
            {...register('email', { required: true, maxLength:120 }) }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
            type="password"
            placeholder="Password"
            {...register('password', { required: true, minLength:8 }) }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword', { required: true, minLength:8 }) }
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handleSubmit(submitForm)}>
        Submit
      </Button>

      <Form.Group>
        <Form.Text className="text-muted">
          Already have an account? Please <Link to='/login'>Log in.</Link>
        </Form.Text>
      </Form.Group>
    </Form>
  );
}

export default SignUpForm;