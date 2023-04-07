import { DeleteOutlined } from '@ant-design/icons';
import { Modal, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ButtonWrapper } from './styles';

const { confirm } = Modal;

// eslint-disable-next-line no-unused-vars
const DeleteButton = ({
  deleteItem,
  record,
  source,
  resource,
  isTextBtn,
  deleteIcon,
  classNameBtn,
  styleBtn,
}) => {
  const { t } = useTranslation();
  const handleDelete = () => {
    confirm({
      title: `${t('popup.alertDelete')} ${t(`${resource}.header`)}`,
      content: t('popup.alertDeleteDes', {
        customMessage: `${record.id}`,
      }),
      okText: t('button.ok'),
      cancelText: t('button.cancel'),
      onOk: () => deleteItem(record.id, record),
      onCancel: () => {},
    });
  };

  return (
    <Tooltip title={isTextBtn ? '' : t('button.delete')}>
      <ButtonWrapper
        className={`${classNameBtn}`}
        style={styleBtn}
        {...(isTextBtn
          ? {
              type: 'link',
            }
          : {
              type: 'primary',
              danger: true,
              icon: deleteIcon || <DeleteOutlined />,
            })}
        onClick={handleDelete}
      >
        {isTextBtn && t('button.delete')}
      </ButtonWrapper>
    </Tooltip>
  );
};

DeleteButton.propTypes = {
  deleteItem: PropTypes.func,
  record: PropTypes.object,
  source: PropTypes.string,
  resource: PropTypes.string,
};

DeleteButton.defaultProps = {
  source: 'delete',
};

export default DeleteButton;
