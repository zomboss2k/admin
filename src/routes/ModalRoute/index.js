import Modal from 'components/common/Modal';
import Bundles from 'pages/Bundles';
import Projects from 'pages/Projects';
import ConfigsProject from 'pages/ConfigsProject';
import Users from 'pages/Users';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const modalRoutes = [
  {
    path: '/configsProject',
    routes: [
      {
        path: '/create',
        component: ConfigsProject.Create,
      },
      {
        path: '/edit',
        component: ConfigsProject.Edit,
      },
    ],
  },

  {
    path: '/bundles',
    routes: [
      {
        path: '/create',
        component: Bundles.Create,
      },
      {
        path: '/edit',
        component: Bundles.Edit,
      },
    ],
  },

  {
    path: '/projects',
    routes: [
      {
        path: '/create',
        component: Projects.Create,
      },
      {
        path: '/edit',
        component: Projects.Edit,
      },
    ],
  },
  {
    path: '/users',
    routes: [
      {
        path: '/create',
        component: Users.Create,
      },
      {
        path: '/edit',
        component: Users.Edit,
      },
    ],
  },
];

let modal = null;

const getModalRoute = (currentModal) => {
  const modalRoute =
    currentModal &&
    modalRoutes.find((route) => currentModal.search(route.path) > -1);
  if (modalRoute) {
    return modalRoute.routes.find(
      (route) => currentModal.indexOf(route.path) > -1,
    );
  }
  return modalRoute;
};

const ModalRoute = () => {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    if (location.hash && location.hash !== '#') {
      const modelRoute = location.hash.replace('#', '/');
      modal = getModalRoute(modelRoute);
    }
    // eslint-disable-next-line
  }, [location.hash]);
  const closeModal = () => {
    history.replace(`${location.pathname}${location.search}`);
  };

  const modelRoute = location.hash.replace('#', '/');
  modal = getModalRoute(modelRoute) || modal;
  const modalOptions = modal && modal?.modalOptions ? modal?.modalOptions : {};
  return (
    <Modal
      {...modalOptions}
      open={!!(location.hash && location.hash !== '#')}
      footer={null}
      onCancel={closeModal}
      onClose={closeModal}
    >
      {modal?.component && (
        <modal.component
          showModal
          visibleModal={!!(location.hash && location.hash !== '#')}
          location={location}
        />
      )}
    </Modal>
  );
};

ModalRoute.propTypes = {
  location: PropTypes.object,
  currentModal: PropTypes.string,
  closeModal: PropTypes.func,
  showModal: PropTypes.func,
  replaceRoute: PropTypes.func,
};

export default ModalRoute;
