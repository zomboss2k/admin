import styled from 'styled-components';
import imgLogin from 'assets/images/login_background.png';

const PublicLayoutWrapper = styled.div`
  .layout {
    height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /* background-image: url(${imgLogin}); */
    background-image: linear-gradient(90deg, #db00ff 0%, #4228e2 101.29%);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .main-content {
    background-color: white;
    padding: 30px 40px;
    text-align: left;
    ${'' /* height: 880px; */}
    max-width: 100%;
    min-width: 350px;
    width: auto;
    border-radius: 20px;
    /* box-shadow: 10px 9px 16px 9px #d6d4d4; */
    @media only screen and (max-width: 768px) {
      flex: 1;
      max-width: 100%;
    }
    ${
      '' /* .logo {
      width: 170px;
      text-align: left;
      padding: 30px 0px 60px 0px;
    } */
    }
    .logo {
      width: 201.7px;
      height: 72px;
      object-fit: contain;
      margin: auto;
      margin-bottom: 30px;
    }
    .title {
      max-width: 295px;
      text-align: center;
      ${
        '' /* .maintitle {
        width: 82%;
        font-family: 'csm-web-text-semibold';
        font-size: 40px;
        text-align: left;
      }
      .mintitle {
        font-family: 'csm-web-text-medium';
        font-size: 25px;
        text-align: left;
        margin-bottom: 50px;
      } */
      } */
      .maintitle {
        font-family: 'Montserrat';
        font-size: 22px;
        font-weight: 600;
        text-align: center;
        color: #05060a;
      }
      .mintitle {
        font-size: 24px;
        font-weight: 500;
        line-height: 29px;
        color: #05060a;
      }
    }
    .ant-btn {
      font-weight: 600;
      font-size: 14px;
    }
  }
  .ant-form-item-children {
    display: block;
  }
  .ant-divider-horizontal.ant-divider-with-text {
    color: #e8e8e8;
  }
  .ant-divider {
    color: #e8e8e8;
  }
  @media only screen and (max-width: 1440px) {
    .main-content {
      .title {
        .maintitle {
        }
      }
    }
  }
  @media only screen and (max-width: 1280px) {
    .main-content {
      .title {
        .maintitle {
        }
      }
    }
  }
  @media only screen and (max-width: 1024px) {
    .main-content {
      .title {
        .maintitle {
        }
        .mintitle {
          font-size: 12px;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .main-content {
      .title {
        max-width: 100%;
        .maintitle {
        }
        .mintitle {
          font-size: 24px;
        }
      }
    }
  }
  @media only screen and (max-width: 425px) {
    .main-content {
      .title {
        max-width: 100%;
        .maintitle {
          font-size: 30px;
          line-height: 30px;
        }
        .mintitle {
          font-size: 12px;
        }
      }
    }
  }
`;

export default PublicLayoutWrapper;
