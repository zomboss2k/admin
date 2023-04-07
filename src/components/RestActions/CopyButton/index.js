import { CopyOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ButtonWrapper } from './styles';

const CopyButton = ({ record, handleCloneItem }) => {
  const { t } = useTranslation();
  return (
    <Tooltip title={t(`button.copy`)}>
      <ButtonWrapper
        type="link"
        source="copy"
        icon={<CopyOutlined />}
        onClick={() => handleCloneItem(record)}
      />
    </Tooltip>
  );
};

CopyButton.propTypes = {
  handleCloneItem: PropTypes.func,
  record: PropTypes.object,
  source: PropTypes.string,
  isView: PropTypes.bool,
};

CopyButton.defaultProps = {
  source: 'edit',
};

export default CopyButton;
