import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login.js';
import Register from './pages/Register';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import SideBar from './components/SideBar';
import { Container } from 'semantic-ui-react';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />

          <Route path="/categories" component={Categories} />
          <Route path="/register" component={Register} />
          <Route
            path={'/(.+)'}
            render={() => (
              <>
                <Navbar />
                <Container style={{border: 'red solid 3px'}}>
                  <SideBar />
                  <Route path="/home" component={Home} exact />
                  <Route path="/dashboard" component={Dashboard} />
                </Container>
              </>
            )}
          />
        </Switch>
        <ToastContainer position="bottom-right" autoClose={5000} />
      </Router>
    </div>
  );
}

export default App;
