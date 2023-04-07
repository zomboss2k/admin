import { useContext } from 'react';
import { Space } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { RestInputContext } from 'components/RestInput/RestInputContext';
import { ButtonWrapper, FooterButtonRowWrapper } from './styles';

const ButtonRow = (props) => {
  const { t } = useTranslation();
  const { form } = useContext(RestInputContext);
  const { loading, onBack, type, showModal } = props;

  if (showModal) {
    return (
      <FooterButtonRowWrapper className="showTotal">
        <ButtonWrapper
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
        >
          {t(type === 'create' ? 'button.create' : 'button.save')}
        </ButtonWrapper>
        {!showModal && <span style={{ width: 20 }} />}
        <ButtonWrapper className="btn-back" onClick={onBack}>
          {t('button.cancel')}
        </ButtonWrapper>
      </FooterButtonRowWrapper>
    );
  }

  return (
    <div className="d-flex flex-end">
      <Space align="end" size={5}>
        <ButtonWrapper htmlType="submit" type="primary" loading={loading}>
          {t(type === 'create' ? 'button.create' : 'button.save')}
        </ButtonWrapper>
        <ButtonWrapper onClick={onBack}>{t('button.cancel')}</ButtonWrapper>
      </Space>
    </div>
  );
};

ButtonRow.propTypes = {
  onBack: PropTypes.func,
  showModal: PropTypes.bool,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(['create', 'edit']),
};

ButtonRow.defaultProps = {
  type: 'edit',
};
export default ButtonRow;
