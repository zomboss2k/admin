import { MailOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Row, Tag } from 'antd';
import RestShow from 'containers/rest/Show';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from 'utils/tools';

const UsersShowUI = ({ record }) => {
  const { t } = useTranslation();

  return (
    <Row gutter={[16, 16]}>
      <Col md={8}>
        <Card>
          <Card.Meta
            avatar={<Avatar size={60} src={getImageUrl(record?.avatar)} />}
            title={`${record?.fullName}`}
          />
          <br />
          <div>
            <Tag color="green">{record?.isGenie ? 'Genie' : 'Normal user'}</Tag>
            <br />
            <br />
            <Button className="p-0" type="text" icon={<MailOutlined />}>
              {record?.email}
            </Button>
          </div>
        </Card>
      </Col>
      <Col md={16}>
        <Card title={t('vendors.header')}></Card>
      </Col>
    </Row>
  );
};
const UsersShow = (props) => (
  <RestShow {...props} hasEdit resource="users">
    <UsersShowUI />
  </RestShow>
);

UsersShowUI.propTypes = {
  record: PropTypes.object,
};

export default UsersShow;
