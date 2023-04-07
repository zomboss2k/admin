import Edit from 'containers/rest/Edit';
import Form from '../components/Form';

const BundlesEdit = (props) => (
  <Edit {...props} resource="bundles">
    <Form />
  </Edit>
);

BundlesEdit.propTypes = {};

export default BundlesEdit;
