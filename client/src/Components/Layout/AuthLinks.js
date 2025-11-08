import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, logout } from '../../utils/auth';

export default function AuthLinks() {
  const [ logged ] = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
    navigate('/login');
  };

  return (
    <Nav className="me-auto">
      {logged ? (
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