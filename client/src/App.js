import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import {
  Discover,
  About,
  CreatePost,
  Home,
  NavBar,
} from './components';
import 'antd/dist/antd.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  // render home as the last route so thta it rernederes if the wrong url is supolied
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <NavBar />
          <Route exact path='/discover' component={Discover} />
          <Route exact path='/about' component={About} />
          <Route exact path='/create-post' component={CreatePost} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
