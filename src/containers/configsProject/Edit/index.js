import Edit from 'containers/rest/Edit';
import Form from '../components/Form';

const ConfigsProjectEdit = (props) => {
  return (
    <Edit
      {...props}
      hasBottomButton={false}
      resource="configsProject"
      header="General information"
    >
      <Form {...props} />
    </Edit>
  );
};

ConfigsProjectEdit.propTypes = {};

export default ConfigsProjectEdit;
