import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
// import { AnimatedSwitch } from 'react-router-transition';
import { useSelector } from 'react-redux';
import NotFoundPage from '../containers/404Page';
import ModalRoute from './ModalRoute';
import privateRoutes from './PrivateRoutes';
import publicRoutes from './PublicRoutes';
import RoutesWrapper from './styles';

const RoutesUI = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const ele = document.getElementById('ipl-progress-indicator');
    if (ele) {
      setTimeout(() => {
        // fade out
        ele.classList.add('available');
      }, 500);
      setTimeout(() => {
        // remove from DOM
        ele.outerHTML = '';
      }, 1500);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // dispatch(getCurrentUser()
      // dispatch(getConfig());
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <RoutesWrapper>
      <Router>
        <Switch>
          {publicRoutes()}
          <Route exact path="/404" component={() => <NotFoundPage />} />
          {privateRoutes()}
          <Redirect
            to={{
              pathname: '/404',
            }}
          />
        </Switch>
        <ModalRoute />
      </Router>
    </RoutesWrapper>
  );
};

export default RoutesUI;
