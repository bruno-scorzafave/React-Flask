import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import AuthLinks from './AuthLinks';

function MainNavbar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="md">
            <Container>
                <Navbar.Brand href="/">Recipes</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end"
                    bg="dark"
                    data-bs-theme="dark"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                            Recipes
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <AuthLinks />
                    </Offcanvas.Body>
                    
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default MainNavbar;