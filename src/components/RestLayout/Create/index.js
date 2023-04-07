import PropTypes from 'prop-types';
import Layout from '../../common/Layout';
import BackButton from '../../RestActions/BackButton';
import RestCreateForm from '../RestCreateForm';

const RestCreateComponent = (props) => {
  const { onBack, showModal, header, noCardWrapper, breadCrumb, resource } =
    props;
  const actions = <BackButton onBack={onBack} />;

  const defaultBreadCrumb = [
    { title: `${resource}.header`, path: `/${resource}` },
  ];

  const content = (
    <div style={{ width: '100%' }}>
      <RestCreateForm
        {...props}
        resource={resource}
        header={header}
        defaultBreadCrumb={defaultBreadCrumb}
        breadCrumb={breadCrumb}
      />
    </div>
  );

  return showModal || noCardWrapper ? (
    content
  ) : (
    <Layout bordered={false} extra={actions}>
      {content}
    </Layout>
  );
};

RestCreateComponent.propTypes = {
  onBack: PropTypes.func,
  showModal: PropTypes.bool,
  header: PropTypes.any,
  location: PropTypes.object,
  noCardWrapper: PropTypes.bool,
  breadCrumb: PropTypes.array,
};
RestCreateComponent.defaultProps = {
  noCardWrapper: false,
};
export default RestCreateComponent;
