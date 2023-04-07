import { Switch } from 'antd';
import UserItem from 'components/items/UserItem';
import EditButton from 'components/RestActions/EditButton';
import ShowButton from 'components/RestActions/ShowButton';
import { STATUS } from 'configs/localData';
import { pick } from 'lodash';
import { useDispatch } from 'react-redux';
import { editUsers } from '@redux/users/actions';
import ActionGroup from 'components/RestActions/ActionGroup';
import DeleteButton from 'components/RestActions/DeleteButton';
import RestFieldItem from 'components/RestField/RestFieldItem';
import List from '../../rest/List';

const UsersList = () => {
  const dispatch = useDispatch();

  return (
    <List redirects={{}} hasCreate={false} resource="users">
      <RestFieldItem
        sorter
        hasSearch
        source="fullName"
        header="users.fullName"
        format={(data, record) => <UserItem record={record} />}
      />
      <RestFieldItem sorter hasSearch source="email" header="users.email" />

      <RestFieldItem
        valueProp="checked"
        filters={STATUS}
        customOnChange={(value, record) => {
          dispatch(
            editUsers({
              data: {
                ...pick(record, ['id', 'role', 'firstName', 'lastName']),
                isGenie: !record.isGenie,
              },
              id: record.id,
              options: { isBack: false },
            }),
          );
        }}
        component={<Switch />}
        source="isActive"
        header="users.isActive"
      />
      <ActionGroup width={20} icon="ic-more">
        <ShowButton />
        <EditButton />
        <DeleteButton />
      </ActionGroup>
    </List>
  );
};

UsersList.propTypes = {};

export default UsersList;
