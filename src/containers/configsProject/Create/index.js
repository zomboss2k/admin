import Create from 'containers/rest/Create';
import Form from '../components/Form';

const ConfigsProjectCreate = (props) => (
  <Create {...props} resource="configsProject" header="General information">
    <Form />
  </Create>
);

ConfigsProjectCreate.propTypes = {};

export default ConfigsProjectCreate;
