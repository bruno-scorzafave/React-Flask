import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, logout } from '../../utils/auth';

export default function AuthLinks() {
  const auth = useAuth(); // adapt to the shape your auth provider returns
  const navigate = useNavigate();
  console.log('AuthLinks auth state:', auth);

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();            // call provider logout (may be async)
    navigate('/login');        // send user to login or home
  };

  // Example shapes: auth.isAuthenticated, auth.user, etc.
  const isAuthenticated = auth[0];

  return (
    <Nav className="me-auto">
      {isAuthenticated ? (
        <>
          <Nav.Link as={Link} to="/create_recipe">Create Recipes</Nav.Link>
          <Nav.Link as={Link} to="/recipes">Recipes List</Nav.Link>
          <Nav.Link href="#" onClick={handleLogout}>Log Out</Nav.Link>
        </>
      ) : (
        <>
          <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
        </>
      )}
    </Nav>
  );
}