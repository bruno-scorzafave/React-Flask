import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = (e) => {
        e.preventDefault();
        
        console.log('Form submitted:', { username, password });
        
        setUsername('');
        setPassword('');
    }

  return (
    <Form className="mt-3">
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            name="username"
            required
            onChange={(e) => { setUsername(e.target.value) }}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={password}
            name="password"
            required
            onChange={(e) => { setPassword(e.target.value) }}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={loginUser}>
        Submit
      </Button>

      <Form.Group>
        <Form.Text className="text-muted">
          Don't have an account? Please <Link to='/signup'>sign up.</Link>
        </Form.Text>
      </Form.Group>
    </Form>
  );
}

export default LoginForm;