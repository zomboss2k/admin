import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Popover, Button } from 'antd';

import { Link } from 'react-router-dom';
import { copyUrl } from 'utils/tools';

export default function UserLabel({ data }) {
  const content = (
    <div>
      <Button
        onClick={() => copyUrl(data?.email)}
        type="link"
        icon={<MailOutlined />}
      >
        {data?.email || 'N/A'}
      </Button>
      <br />
      <Button
        onClick={() => copyUrl(data?.phoneNumber)}
        type="link"
        icon={<PhoneOutlined />}
      >
        {data?.phoneNumber || 'N/A'}
      </Button>
    </div>
  );
  return (
    <Popover content={content}>
      <Link to={`/users/${data?.id}/edit`}>
        <Button type="link">{`${data?.firstName} ${data?.lastName}`}</Button>
      </Link>
    </Popover>
  );
}
