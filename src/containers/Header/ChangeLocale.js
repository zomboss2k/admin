import { Dropdown, Menu } from 'antd';
import I18n from 'i18next';
import { useMemo, useState } from 'react';
import { LOCALES } from '../../configs/localData';
import { ChangeLocaleStyle } from './styles';

const ChangeLocale = () => {
  const [locale, setLocale] = useState(
    localStorage.getItem('i18nextLng') || I18n.language,
  );
  const currrentLocale = useMemo(
    () => LOCALES.find((e) => e.localeValue === locale),
    [locale],
  );

  const onChangeMenu = ({ key }) => {
    setLocale(key);
    I18n.changeLanguage(key);
    localStorage.setItem('i18nextLng', key);
  };

  const menu = (
    <Menu onClick={onChangeMenu}>
      {LOCALES.filter((e) => e.localeValue).map((e) => (
        <Menu.Item key={e.localeValue}>
          <ChangeLocaleStyle type="text">
            <div className="text">{e.localeValue}</div>
            <span style={{ fontSize: 30 }}>{e?.emoji}</span>
          </ChangeLocaleStyle>
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <ChangeLocaleStyle type="text">
        <div className="text">{locale}</div>
        <span style={{ fontSize: 30 }}>{currrentLocale?.emoji}</span>
      </ChangeLocaleStyle>
    </Dropdown>
  );
};
ChangeLocale.propTypes = {};

export default ChangeLocale;
