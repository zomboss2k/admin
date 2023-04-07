import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Header from '../../containers/Header';
import SideBar from '../../containers/SideBar';
import PrivateLayoutWrapper from './styles';
// import { useTranslation } from 'react-i18next';

//{ Content, Footer }
const { Content } = Layout;

const PrivateLayout = ({ children }) => {
  // const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  // if (!hasPrivateLayoutWrapper) {
  //   return (
  //     <PrivateLayoutWrapper className="mainView mainWithoutSidebar">
  //       <Content className="container">
  //         <div className="content">{children}</div>
  //       </Content>
  //     </PrivateLayoutWrapper>
  //   );
  // }
  return (
    <PrivateLayoutWrapper collapsed={`${collapsed}`}>
      <input
        onChange={() => {}}
        id="collapsedTracker"
        type="checkbox"
        checked={!collapsed}
      />
      <label
        role="presentation"
        htmlFor="collapsedTracker"
        className="overlay"
        onClick={toggle}
      />

      <SideBar toggle={setCollapsed} collapsed={collapsed} />
      <Layout style={{ background: '#fafafa' }}>
        {/* <Anchor>
        </Anchor> */}
        <Header onToggle={toggle} collapsed={collapsed} />
        <Content>
          <div className="content">{children}</div>
        </Content>
        {/* <Footer
          className="footer"
          style={{
            fontSize: 12,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <b>
            {t(`appInfo.copyright`, {
              year: new Date().getFullYear(),
            })}
          </b>
          <div>
            <a href="/contact-us">
              <b>{t('contactUs.title')}</b>
            </a>
          </div>
        </Footer> */}
      </Layout>
    </PrivateLayoutWrapper>
  );
};

PrivateLayout.propTypes = {
  children: PropTypes.any,
  // title: PropTypes.string,
};

export default PrivateLayout;
