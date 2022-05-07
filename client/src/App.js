
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./pages/Login.js"
import Register from './pages/Register';



function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register}  />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
