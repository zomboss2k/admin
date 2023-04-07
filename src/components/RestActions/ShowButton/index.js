import { EyeOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ButtonWrapper } from './styles';

const ShowButton = (props) => {
  const { t } = useTranslation();
  return (
    <Tooltip header={t('tooltip.viewDetail')}>
      <ButtonWrapper
        primary
        {...!props.isText && {
          type: "primary",
          icon: <EyeOutlined />,
        }}
        {...props}
        onClick={() => props.gotoShowPage(props.record.id, props.source)}
      >
        {props.isText && (
          t(props.text || 'button.view')
        )}
        {/* <IntlMessages id="button.show" /> */}
      </ButtonWrapper>
    </Tooltip>
  );
};

ShowButton.propTypes = {
  gotoShowPage: PropTypes.func,
  record: PropTypes.object,
  source: PropTypes.string,
};

ShowButton.defaultProps = {
  source: 'show',
};

export default ShowButton;
