import {
  AppstoreOutlined,
  HomeOutlined,
  CaretRightFilled,
  CaretLeftFilled,
  UnorderedListOutlined,
  LogoutOutlined,
  CaretUpOutlined,
  // SettingOutlined,
  // ClockCircleOutlined,
  // FormatPainterOutlined,
  // LayoutFilled,
  // UserOutlined,
} from '@ant-design/icons';
import { logout } from '@redux/auth/actions';

import { Button, Layout, Menu } from 'antd';
// import SearchInput from 'components/RestActions/SearchInput';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { checkRole } from 'utils/tools';
import fullLogo from '../../assets/images/logoShaker.png';
import logoShort from '../../assets/images/logoShakerShort.png';
import sidebarAccount from '../../assets/images/sideBarAccount.png';

const getCurrentTab = (str, key) => {
  const paths = str && str.split('/');
  return paths && paths[key];
};

const sidebarMenu = [
  {
    key: 'dashboard',
    text: 'Metrix',
    Icon: HomeOutlined,
    url: '/',
    // roles: ['ADMIN'],
  },
  {
    key: 'bundle',
    text: 'Bundles',
    Icon: UnorderedListOutlined,
    url: '/bundles',
  },
  {
    key: 'projects',
    text: 'Projects',
    Icon: AppstoreOutlined,
    url: '/projects',
  },
];

//

const SideBar = ({ collapsed, toggle }) => {
  // const [collapsed, setCollapsed] = useState(false);

  const { t } = useTranslation();
  const role = useSelector((state) => state.auth.data.role);
  const location = useLocation();
  const history = useHistory();
  const url = getCurrentTab(location.pathname, 1);
  const dispatch = useDispatch();

  return (
    <div style={{ position: 'relative' }}>
      <Button
        shape="circle"
        icon={collapsed ? <CaretRightFilled /> : <CaretLeftFilled />}
        onClick={() => toggle(!collapsed)}
        id="btn-collapse"
        style={{
          left: collapsed ? '40px' : '225px',
          zIndex: 2,
        }}
      />
      <div
        // className={`sider-wrapper sider-wrapper-${collapsed}`}
        // onMouseEnter={() => toggle(false)}
        // onMouseLeave={() => toggle(true)}
        className={`sider-wrapper `}
      >
        <Layout.Sider
          trigger={null}
          collapsible
          theme="light"
          collapsed={collapsed}
          className="sidebar"
          collapsedWidth={65}
          width={250}
        >
          <div className={`h-65 w-100 flex-center p-10`}>
            {collapsed === false ? (
              <>
                <img alt="" src={fullLogo} className="fullLogo" />
                <img
                  alt="logoShort"
                  src={logoShort}
                  // className={`no-label`}

                  style={{
                    height: '25px',
                    display: 'none',
                  }}
                />
              </>
            ) : (
              <>
                <img
                  alt=""
                  src={fullLogo}
                  className="fullLogo"
                  style={{ display: 'none' }}
                />
                <img
                  alt="logoShort"
                  src={logoShort}
                  style={{
                    height: '20px',
                  }}
                />
              </>
            )}
          </div>
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[url || 'dashboard']}
            defaultSelectedKeys={[url || 'dashboard']}
          >
            {/* <SearchInput /> */}
            {sidebarMenu.map((menu) => {
              if (!checkRole(menu.roles, role)) {
                return null;
              }
              return (
                <Menu.Item
                  key={menu.key}
                  title={t(menu.text)}
                  onClick={() => history.push(menu.url)}
                  icon={<menu.Icon mode="horizontal" />}
                  items={menu}
                >
                  {/* {!collapsed && (
                      <span className="menu-label">{t(menu.text)}</span>
                    )} */}
                  <span className="menu-label">{t(menu.text)}</span>
                </Menu.Item>
              );
            })}
          </Menu>
          <div className="d-flex scroll-hide">
            <div className="w-100 h-50 d-flex ml-10">
              <img alt="" src={sidebarAccount} className={`h-50`} />
              <CaretUpOutlined className="mlr-10" />
              <p>Admin</p>
            </div>
            <div
              className="mr-10 size-16"
              style={{ color: '#6852D3', cursor: 'pointer' }}
              onClick={() => dispatch(logout())}
            >
              <LogoutOutlined />
            </div>
          </div>
        </Layout.Sider>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  collapsed: PropTypes.bool,
};

export default SideBar;
