import { Card, Col, Row } from 'antd';
import PageTitle from 'components/common/PageTitle';
import i18next, { t } from 'i18next';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// import PagesList from 'containers/Pages/List';
import SettingStyle from './styles';

const MENUS = [
  {
    key: 'cms',
    title: 'settings.banners.title',
    description: 'settings.banners.description',
    url: '/settings/cms',
  },
];

const Settings = () => {
  const history = useHistory();
  const onClick = (e) => {
    history.push(e.url);
  };

  return (
    <SettingStyle>
      <div className="page-header">
        <PageTitle>{i18next.t('settings.header')}</PageTitle>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        {MENUS.map((e) => (
          <Col md={8} sm={12} key={e.key}>
            <Card onClick={() => onClick(e)} hoverable bordered={false}>
              <Card.Meta
                description={t(e.description, {
                  site: t(
                    `appInfo.name`,
                  ),
                })}
                title={t(e.title)}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </SettingStyle>
  );
};

Settings.propTypes = {
  match: PropTypes.object,
  redirects: PropTypes.object,
  rootPath: PropTypes.string,
  initCreateData: PropTypes.object,
};

Settings.defaultProps = {
  rootPath: '/settings',
  redirects: {
    edit: 'modal',
    create: 'modal',
  },
  initCreateData: {},
};

export default Settings;
