import PrivateLayout from 'layout/PrivateLayout';
import Bundles from 'pages/Bundles';
import Projects from 'pages/Projects';
import { flatMap, map } from 'lodash';
import Home from 'pages/Dashboard';
import Profile from 'pages/Profile';
import Settings from 'pages/Settings';
import Users from 'pages/Users';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { checkRole } from 'utils/tools';
// import Contacts from 'pages/Contacts';
import DevelopmentPage from 'pages/Development';
import ConfigsProject from 'pages/ConfigsProject';

const routes = [
  {
    path: '/configsProject',
    routes: [
      {
        path: '/',
        component: ConfigsProject.List,
      },
      {
        path: '/create',
        component: ConfigsProject.Create,
      },
      {
        path: '/:id/show',
        component: ConfigsProject.Show,
      },
      {
        path: '/:id/edit',
        component: ConfigsProject.Edit,
      },
    ],
  },
  {
    path: '/bundles',
    routes: [
      {
        path: '/',
        component: Bundles.List,
      },
      {
        path: '/create',
        component: Bundles.Create,
      },
      {
        path: '/:id/show',
        component: Bundles.Show,
      },
      {
        path: '/:id/edit',
        component: Bundles.Edit,
      },
    ],
  },

  {
    path: '/projects',
    routes: [
      {
        path: '/',
        component: Projects.List,
      },
      {
        path: '/create',
        component: Projects.Create,
      },
      {
        path: '/:id/show',
        component: Projects.Show,
      },
      {
        path: '/:id/edit',
        component: Projects.Edit,
      },
    ],
  },
  {
    path: '/users',
    routes: [
      {
        path: '/',
        component: Users.List,
      },
      {
        path: '/create',
        component: Users.Create,
      },
      {
        path: '/:id/edit',
        component: Users.Edit,
      },
      {
        path: '/:id/show',
        component: Users.Show,
      },
    ],
  },
  {
    path: '/profile',
    component: Profile,
    exact: true,
    title: 'profile.title',
  },
  {
    path: '/settings',
    component: Settings,
    exact: true,
    title: 'settings.title',
    hasPrivateLayoutWrapper: true,
  },
  {
    path: '/',
    component: Home,
    exact: true,
    title: 'dashboard.title',
    hasPrivateLayoutWrapper: true,
  },
  {
    path: '/development',
    component: DevelopmentPage,
    exact: true,
    title: 'DEVELOPMENT',
    hasPrivateLayoutWrapper: true,
  },
];

const wrappedRoutes = map(
  flatMap(routes, (route) => {
    if (route.routes) {
      return map(route.routes, (subRoute) => ({
        ...subRoute,
        path: route.path + subRoute.path,
        exact: subRoute.path === '/',
        hasPrivateLayoutWrapper:
          subRoute.hasPrivateLayoutWrapper !== undefined
            ? subRoute.hasPrivateLayoutWrapper
            : route.hasPrivateLayoutWrapper,
        component: subRoute.component || route.component,
      }));
    }
    return route;
  }),
  (route) => <PrivateRoute {...route} key={route.path} />,
);

function PrivateRoute({
  component: Component,
  title,
  hasPrivateLayoutWrapper,
  roles,
  ...rest
}) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  return checkRole(roles, role) ? (
    <Route
      {...rest}
      render={
        (props) =>
          isAuthenticated ? (
            <PrivateLayout
              title={title}
              hasPrivateLayoutWrapper={hasPrivateLayoutWrapper}
            >
              <Component />
            </PrivateLayout>
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                // eslint-disable-next-line
                state: { from: props.location },
              }}
            />
          )
        // eslint-disable-next-line react/jsx-curly-newline
      }
    />
  ) : (
    <Route render={null} />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
  title: PropTypes.string,
  hasPrivateLayoutWrapper: PropTypes.bool,
  roles: PropTypes.array,
};

const PrivateRoutes = () => wrappedRoutes;

export default PrivateRoutes;
