import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ButtonWrapper } from './styles';

const EditButton = ({ isTextBtn, isView, source, record, gotoEditPage }) => {
  const { t } = useTranslation();
  return (
    <Tooltip title={isTextBtn ? '' : t(`button.${isView ? 'view' : 'edit'}`)}>
      <ButtonWrapper
        {...(isTextBtn
          ? {
              type: 'link',
            }
          : {
              type: 'primary',
              source,
              icon: isView ? <EyeOutlined /> : <EditOutlined />,
            })}
        onClick={() => gotoEditPage(record ? record.id : '')}
      >
        {isTextBtn && t('button.edit')}
      </ButtonWrapper>
    </Tooltip>
  );
};

EditButton.propTypes = {
  gotoEditPage: PropTypes.func,
  record: PropTypes.object,
  source: PropTypes.string,
  isView: PropTypes.bool,
};

EditButton.defaultProps = {
  source: 'edit',
};

export default EditButton;
