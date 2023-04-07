import { omit } from 'lodash';
import Create from '../../rest/Create';
import Form from '../components/Form';

const UsersCreate = (props) => (
  <Create
    {...props}
    formatOnSubmit={(values) => omit(values, 'confirmPassword')}
    resource="users"
  >
    <Form />
  </Create>
);

UsersCreate.propTypes = {};

export default UsersCreate;
