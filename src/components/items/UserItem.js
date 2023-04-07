import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getImageUrl } from 'utils/tools';

export default function UserItem({ record }) {
  return (
    <Link className="cursor-pointer" to={`/users/${record?.id}/show`}>
      <div className="d-flex cursor-pointer">
        <Avatar src={getImageUrl(record?.avatar)} />
        <div className="text-primary t-14px-1.57 ml-8px">
          <b>{record.fullName || ''}</b>
          <div>{`${record?.email}`}</div>
        </div>
      </div>
    </Link>
  );
}

UserItem.propTypes = {
  record: PropTypes.object,
};
