import Create from 'containers/rest/Create';
import Form from '../components/Form';

const BundlesCreate = (props) => (
  <Create {...props} resource="bundles">
    <Form />
  </Create>
);

BundlesCreate.propTypes = {};

export default BundlesCreate;
