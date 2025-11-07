import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function SignUpForm() {
    const {register, handleSubmit, watch, reset, formState: { errors }} = useForm();
    const [serverError, setServerError] = useState('');
    const [serverSuccess, setServerSuccess] = useState('');

    const submitForm = (data) => {
      delete data.confirmPassword;

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }

      setServerError('');
      setServerSuccess('');
      
      fetch('/auth/signup', requestOptions)
        .then(response => {
          if (!response.ok) {
            setServerError('Failed to register user. Please try again.');
            return response.json().then(errorData => {
              throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
            });
          }
          return response.json();
        })
        .then(data => {
          setServerSuccess(data.message);
          reset();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    const password = watch("password");

  return (
    <Form className="mt-3" onSubmit={handleSubmit(submitForm)}>
      {serverError && (
        <Alert variant="danger" className="mb-3">
          {serverError}
        </Alert>
      )}
      {serverSuccess && (
        <Alert variant="success" className="mb-3">
          {serverSuccess}
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

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
            type="email"
            placeholder="Enter email"
            {...register('email', { 
              required: "Email is required",
              maxLength:{value: 120, message:"Email must be 120 characters or less"} 
            })}
        />
        { errors.email && <span className="text-danger">{ errors.email.message }</span> }
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

      <Form.Group className="mb-3" controlId="formConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword', { 
              required: "Confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match"
            })}
        />
        { errors.confirmPassword && <span className="text-danger">{ errors.confirmPassword.message }</span> }
      </Form.Group>

      <Button variant="primary" type="submit">
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