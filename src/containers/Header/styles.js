import styled from 'styled-components';
import { Layout, Drawer, Button } from 'antd';

export const DrawerStyles = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
  }
`;

const HeaderWrapper = styled(Layout.Header)`
  border-bottom: 1.5px solid ${({ theme }) => theme.background.container};
  background: ${({ theme }) => theme.background.content};
  .btn {
    margin-right: 10px;
  }
  .header-logo {
    height: 30px;
    @media only screen and (max-width: 640px) {
      display: none;
    }
  }
  .menu-button {
    display: none;
    @media only screen and (max-width: 640px) {
      display: block;
    }
  }
  .notification-section {
    margin-right: 20px;
    .ant-btn {
      padding: 0;
      border: none;
      i {
        font-size: 20px;
      }
    }
  }
  .user-role {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 10px;
    justify-content: center;
    & > div {
      line-height: normal;
    }
    .name {
      font-size: 16px;
      font-weight: 500;
    }
  }
  .trigger {
    color: ${({ theme }) => theme.text.primary};
    font-size: 24px;
    transition: 300ms ease all;
  }
  .reverse-trigger {
    transform: rotate(180deg);
  }

  .leftHeader {
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 430px) {
      width: 100%;
      display: inherit;
      padding-right: 45px;
    }
  }
  .rightHeader {
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 640px) {
      .user-role {
        display: none;
      }
    }
  }
  .localeSelect {
    padding: 5px;
    font-weight: 600;
    cursor: pointer;
    color: ${({ theme }) => theme.text.disabled};
    &.actife {
      color: ${({ theme }) => theme.palette.primary};
    }
  }
  &.withoutSidebar {
    .leftHeader {
      .ant-page-header {
        padding: 0px;
      }
    }
  }
  .contact-us {
    padding: 0px 20px;
    border-right: 1px solid #eeeeee;
    border-left: 1px solid #eeeeee;
    height: 100%;
    margin-right: 10px;
  }
  .logout {
    color: ${({ theme }) => theme.color.red};
    font-weight: 500;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .new {
    background-color: ${({ theme }) => theme.text.primary};
    font-weight: 500;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: '#6852D3';
    :hover {
      background-color: ${({ theme }) => theme.color.darkSlateBlue};
    }
  }
  .back {
    background-color: rgba(68, 39, 227, 0.05);
    font-weight: 500;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: '#6852D3';
  }
`;

export const ChangeLocaleStyle = styled(Button)`
  display: flex;
  align-items: center;
  .text {
    font-size: 12px;
    font-weight: 500;
    font-family: 'Montserrat', sans-serif;
    margin-right: 15px;
    text-transform: uppercase;
  }
`;

export default HeaderWrapper;
