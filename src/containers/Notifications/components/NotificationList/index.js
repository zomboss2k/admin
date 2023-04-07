import { BellOutlined } from '@ant-design/icons';
import { List, Spin } from 'antd';
import { NOTIFICATIONS } from 'configs/localData';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Waypoint } from 'react-waypoint';
import { formatDateTime } from 'utils/textUtils';
import ListStyles from './styles';

const CustomList = ({
  onClose,
  retrieveList,
  resourceData,
  resourceFilter,
}) => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.notifications.loading);
  const handleEnterWaypoint = () => {
    const { count } = resourceFilter;
    if (resourceData.length < count && resourceData.length > 0 && !loading) {
      retrieveList({}, false);
    }
  };
  const handleClickNotification = (record) => {
    onClose();
    // dispatch(seenNotification({ id: record?.id, isSeen: true }));
    if (record?.prescriptionId) {
      history.push(
        `/prescriptions#prescriptions/${record?.prescriptionId}/edit`,
      );
    }
  };
  return (
    <ListStyles
      itemLayout="horizontal"
      dataSource={resourceData || []}
      renderItem={(record) => (
        <List.Item
          key={record?.id}
          onClick={() => handleClickNotification(record)}
          className={record?.isSeen ? '' : 'not-seen-noti'}
        >
          <List.Item.Meta
            avatar={
              <div className="notification-icon">
                <BellOutlined
                  size={35}
                  type={
                    NOTIFICATIONS.find(
                      (notification) => notification.value === record.title,
                    )?.icon
                  }
                />
              </div>
            }
            title={i18next.t(
              NOTIFICATIONS.find(
                (notification) => notification.value === record.title,
              )?.text,
            )}
            description={formatDateTime(record.createdAt)}
          />
          {record.message}
        </List.Item>
      )}
    >
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spin />
        </div>
      )}
      <Waypoint onEnter={handleEnterWaypoint} />
    </ListStyles>
  );
};

CustomList.propTypes = {
  resourceData: PropTypes.array,
  retrieveList: PropTypes.func,
  resourceFilter: PropTypes.object,
  onClose: PropTypes.func,
};

export default CustomList;
