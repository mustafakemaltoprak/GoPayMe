import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login.js';
import Register from './pages/Register';
import Home from './pages/Home';
import Categories from './pages/Categories';
import DetailsPage from './pages/DetailsPage';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SideBar from './components/SideBar';
import { Container, Grid } from 'semantic-ui-react';
import MyFundraisers from './pages/MyFundraisers';
import Profile from './pages/Profile';
import MyProfile from './pages/MyProfile';
import ScrollToTop from './components/ScrollToTop';
import { Suspense } from 'react';
import Loader from './components/Loader';
import AnimatingRoutes from './AnimatingRoutes';

// import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <div>
      <Router>
        <ScrollToTop/>
        <AnimatingRoutes/>
        <ToastContainer position="bottom-right" autoClose={5000} />
      </Router>
    </div>
  );
}

export default App;
