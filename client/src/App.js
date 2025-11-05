import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router';
import MainNavbar from './Components/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
   
  return (
    <Router>
      <MainNavbar />
    </Router>
  );
}

export default App;
