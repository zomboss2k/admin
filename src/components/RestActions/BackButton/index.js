import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ButtonWrapper } from './styles';

const BackButton = (props) => {
  const { t } = useTranslation();
  return (
    <Tooltip header={t('tooltip.goBack')}>
      <ButtonWrapper icon="rollback" onClick={() => props.onBack(props.source)}>
        {/* <IntlMessages id="button.back" /> */}
      </ButtonWrapper>
    </Tooltip>
  );
};

BackButton.propTypes = {
  onBack: PropTypes.func,
  source: PropTypes.string,
};

BackButton.defaultProps = {
  source: 'back',
};

export default BackButton;
