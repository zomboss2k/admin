import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import CustomBreadcrumb from '../../common/Breadcrumb';
import Layout from '../../common/Layout';
import RestEditForm from '../RestEditForm';

const RestEditComponent = (props) => {
  const { showModal, noCardWrapper, breadCrumb, resource, nameHeader } = props;
  const { id } = useParams();

  const defaultBreadCrumb = [
    { title: `${resource}.header`, path: `/${resource}` },
    {
      title: nameHeader ? nameHeader : `${id}`,
      path: window.location.pathname,
    },
  ];

  return showModal || noCardWrapper ? (
    <RestEditForm {...props} />
  ) : (
    <Layout bordered={false}>
      <CustomBreadcrumb data={breadCrumb || defaultBreadCrumb} {...props} />
      <RestEditForm {...props} />
    </Layout>
  );
};
RestEditComponent.propTypes = {
  location: PropTypes.object,
  showModal: PropTypes.bool,
  header: PropTypes.any,
  noCardWrapper: PropTypes.bool,
  breadCrumb: PropTypes.array,
};

RestEditComponent.defaultProps = {
  noCardWrapper: false,
};

export default RestEditComponent;
