/* eslint-disable react/jsx-closing-tag-location */
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Menu, PageHeader } from 'antd';
import I18n from 'i18next';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout as logoutAction } from '../../@redux/auth/actions';
import HeaderWrapper from './styles';

const HeaderWithoutSideBar = ({ title }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [locale, setLocale] = useState(
    localStorage.getItem('locale') || I18n.language,
  );
  const profileMenu = [
    {
      key: 'profile',
      text: 'header.profile',
      url: '#',
    },
  ];

  const changeLocale = (e) => () => {
    setLocale(e);
    I18n.changeLanguage(e);
    localStorage.setItem('locale', e);
  };

  useEffect(() => {
    I18n.changeLanguage(locale);
  }, [locale]);

  return (
    <HeaderWrapper className="header withoutSidebar">
      <div className="leftHeader">
        <PageHeader onBack={() => history.goBack()} title={t(title)} />

        <div className="title">
          {t(`appInfo.name.${process.env.REACT_APP_SOURCE_NAME || 'ses'}`)}
        </div>
      </div>
      <div className="rightHeader">
        <div
          className={`localeSelect${locale === 'vi' ? ' active' : ''}`}
          role="presentation"
          onClick={changeLocale('vi')}
        >
          VI
        </div>
        <div
          className={`localeSelect${locale === 'en' ? ' active' : ''}`}
          role="presentation"
          onClick={changeLocale('en')}
        >
          EN
        </div>
        <Dropdown
          menu=<Menu style={{ minWidth: '120px' }}>
            {profileMenu.map((menu) => (
              <Menu.Item key={menu.key}>
                <a href={menu.url}>{t(menu.text)}</a>
              </Menu.Item>
            ))}
            <Menu.Divider />
            <Menu.Item onClick={() => dispatch(logoutAction())} key="logout">
              {t('header.logout')}
            </Menu.Item>
          </Menu>
          trigger={['click']}
        >
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </HeaderWrapper>
  );
};
HeaderWithoutSideBar.propTypes = {
  title: PropTypes.string,
};

export default HeaderWithoutSideBar;
