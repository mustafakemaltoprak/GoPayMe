import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login.js';
import Register from './pages/Register';
import Home from './pages/Home';
import Categories from './pages/Categories';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} exact />
          <Route path="/categories" component={Categories} />
          <Route path="/register" component={Register} />
        </Switch>
        <ToastContainer position="bottom-right" autoClose={5000} />
      </Router>
    </div>
  );
}

export default App;
