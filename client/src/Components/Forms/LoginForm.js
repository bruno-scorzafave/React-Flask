import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

import { login } from '../../utils/auth';

function LoginForm() {
    const [serverError, setServerError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const loginUser = (data) => {
      console.log('Login form submitted:', data);

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }

      fetch('/auth/login', requestOptions)
        .then(response => {
          if (!response.ok) {
            setServerError('Failed to login. Please try again.');
            return response.json().then(errorData => {
              throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
            });
          }
          return response.json();
        })
        .then(data => {
          console.log('Login successful:', data.access_token);
          
          login(data.access_token);
          
          navigate('/');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

  return (
    <Form className="mt-3" onSubmit={handleSubmit(loginUser)}>
      {serverError && (
        <Alert variant="danger" className="mb-3">
          {serverError}
        </Alert>
      )}
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter username"
            className='mb-2'
            {...register('username', { 
              required: "Username is required",
              maxLength:{value: 25, message:"Username must be 25 characters or less"} 
            })}
        />
        { errors.username && <span className="text-danger">{ errors.username.message }</span> }
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
            type="password"
            placeholder="Password"
            {...register('password', { 
              required: "Password is required",
              minLength:{value: 8, message:"Password must be 8 characters or more"}
            })}
        />
        { errors.password && <span className="text-danger">{ errors.password.message }</span> }
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

      <Form.Group>
        <Form.Text className="text-muted">
          Don't have an account? Please <Link to='/signup'>Sign Up.</Link>
        </Form.Text>
      </Form.Group>
    </Form>
  );
}

export default LoginForm;