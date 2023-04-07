import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { ButtonWrapper } from './styles';

// eslint-disable-next-line no-unused-vars
const DeleteButton = ({ pinItem, record, source, resource }) => {
  const { t } = useTranslation();
  const handlePin = () => {
    pinItem(record.id);
  };

  return (
    <Tooltip title={t(record.isPinned ? 'button.unPin' : 'button.pin')}>
      <ButtonWrapper
        icon={record.isPinned ? 'undo' : 'pushpin'}
        onClick={handlePin}
      />
    </Tooltip>
  );
};

DeleteButton.propTypes = {
  pinItem: PropTypes.func,
  record: PropTypes.object,
  source: PropTypes.string,
  resource: PropTypes.string,
};

DeleteButton.defaultProps = {
  source: 'pin',
};

export default DeleteButton;
