import { MenuFoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import I18n from 'i18next';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { clearCache } from '@redux/config/actions';
import Notifications from './Notifications';
import HeaderWrapper from './styles';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import Text from 'components/common/Text';
// import { logout } from '@redux/auth/actions';
// import ChangeLocale from './ChangeLocale';
// import logoShaker from '../../assets/images/logoShaker.png';

const ArtistHeader = ({ onToggle }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  // const notSeen = useSelector((state) => state.notifications.notSeen);

  // Path display in header
  const { id } = useParams();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const filteredPathnames = pathnames.filter((x) => x !== id);
  const updatedPath = filteredPathnames.join(' / ');
  const nameToUpper = updatedPath
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const handleBackButtonClick = () => {
    history.goBack();
  };

  const [visible, setVisible] = useState(false);
  const toggleDrawer = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    I18n.changeLanguage(localStorage.getItem('i18nextLng'));
  }, []);

  return (
    <HeaderWrapper className="header">
      <div className="leftHeader">
        <Button
          className="menu-button"
          type="text"
          icon={<MenuFoldOutlined />}
          onClick={onToggle}
        />
        <Button onClick={handleBackButtonClick} className="back" type="text">
          {t('< Back')}
        </Button>

        <p className="ml-5 fw-semi-bold">{nameToUpper}</p>
      </div>
      <div className="rightHeader">
        {/* <ChangeLocale /> */}
        {/* <a href="/contact-us">
          <Button type="text" className="contact-us">
            {t('contactUs.title')}
          </Button>
        </a> */}
        <Notifications closable={false} onClose={toggleDrawer} open={visible} />
        <Button
          style={{
            display: 'none',
          }}
          type="text"
          onClick={() => dispatch(clearCache())}
        >
          clear cache
        </Button>

        {nameToUpper.toString() !== 'ConfigsProject / Edit' ? (
          <Link to="/projects/create">
            <Button type="text" className="new">
              <Text color="#fff">{t('+ New')}</Text>
            </Button>
          </Link>
        ) : (
          ''
        )}
      </div>
    </HeaderWrapper>
  );
};
ArtistHeader.propTypes = {
  onToggle: PropTypes.func,
};
export default ArtistHeader;
