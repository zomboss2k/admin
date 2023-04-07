import { Tag } from 'antd';
import { ORDER_TRACKING_STATUS_CONST } from 'configs/localData/constants';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const StatusLabel = ({ record }) =>
  record ? <Tag color={record.color}>{record.name}</Tag> : <Tag />;
StatusLabel.propTypes = {
  record: PropTypes.object,
};

const getStatusText = ({ data, item }) => {
  if (data?.isPickup || data?.payment?.type === 'cod') {
    return item.textCod || item.textPickup || item.text
  }
  return item.text
}
export const OrderStatusLabel = ({ record }) => {
  const { t } = useTranslation();

  const tempOrderStatus = ORDER_TRACKING_STATUS_CONST[record?.status];
  if (!tempOrderStatus) return null;

  return record ? (
    <Tag color={ORDER_TRACKING_STATUS_CONST[record?.status]?.color}>
      {t(getStatusText({
        data: record,
        item: tempOrderStatus,
      }))}
    </Tag>
  ) : (
    <Tag />
  );
};
StatusLabel.propTypes = {
  record: PropTypes.object,
};

export default StatusLabel;
