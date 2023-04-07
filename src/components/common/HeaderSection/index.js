import PropTypes from 'prop-types';
// import { Icon } from 'antd';
import { HeaderSectionWrapper } from './styles';
import { useTranslation } from 'react-i18next';

const HeaderSection = ({ title }) => {
  const { t } = useTranslation();
  return <HeaderSectionWrapper>{t(title)}</HeaderSectionWrapper>;
};

HeaderSection.propTypes = {
  title: PropTypes.string,
};

export default HeaderSection;
