import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router';
import Container from 'react-bootstrap/esm/Container';

import MainNavbar from './Components/Pages/Navbar';
import HomePage from './Components/Pages/Home';
import LoginPage from './Components/Pages/Login';
import SignupPage from './Components/Pages/SignUp';
import CreateRecipePage from './Components/Pages/CreateRecipe';
import './Styles/main.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
   
  return (
    <Router>
      <MainNavbar />
      <Container className="mt-4">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/create_recipe" element={<CreateRecipePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
