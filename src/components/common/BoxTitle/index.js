import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BoxSubTitle, BoxTitle } from './styles';

const BoxTitleUI = (props) => {
  const { t } = useTranslation();
  return (
    <div style={{ marginBottom: 20 }}>
      {props.header ? (
        <BoxTitle className="isoBoxTitle">{t(props.header)}</BoxTitle>
      ) : (
        ''
      )}
      {props.subtitle ? (
        <BoxSubTitle className="isoBoxSubTitle">{props.subtitle}</BoxSubTitle>
      ) : (
        ''
      )}
    </div>
  );
};
BoxTitleUI.propTypes = {
  header: PropTypes.any,
  subtitle: PropTypes.string,
};

export default BoxTitleUI;
