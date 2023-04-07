import styled, { createGlobalStyle } from 'styled-components';
import { CSS_COMMON, CSS_RESET } from 'utils/css';
import PoppinsRegular from 'assets/fonts/Poppins-Regular.otf';
import PoppinsMedium from 'assets/fonts/Poppins-Medium.otf';
import PoppinsBold from 'assets/fonts/Poppins-Bold.otf';
import PoppinsSemiBold from 'assets/fonts/Poppins-SemiBold.otf';

const AppWrapper = styled.div`
  .gradientBackground {
    background-image: ${({ theme }) =>
      `linear-gradient(90deg, ${theme.palette.lightPrimary}, ${theme.palette.primary})`};
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

  .flex-start-between {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsRegular}) format('truetype');
    font-display: swap;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsMedium}) format('truetype');
    font-weight: 500;
    font-display: swap;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsSemiBold}) format('truetype');
    font-weight: 600;
    font-display: swap;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsBold}) format('truetype');
    font-weight: 700;
    font-display: swap;
  }
  @font-face {
    font-family: 'Poppins';
    src: url(${PoppinsBold}) format('truetype');
    font-weight: bold;
    font-display: swap;
  }
  ${CSS_RESET}
  ${CSS_COMMON}
  :root {
  --primary: #2C3546;
  --client-primary: #AB2328;
  --light-primary: #4cb1e8;
  --secondary: #3e68ff;
  --loading-bg: #2c3e51cc;
  --bg-primary: #06aeba;
  --bg-warning: #f8b51d;
  --bg-error: #ed1558;
  --bg-content: #fff;
  --bg-container: #f4f7f9;
  --bg-input: #ffffff;
  --bg-search-input: #f3f3f3;
  --bg-light: #f9f9f9;
  --bg-black: #000;
  --bg-gray: #eeeeee;

  --bg-disabled: #969696;
  --bg-header-table: #ffff;
  --bg-gray: #f6f6f6;
  --bg-light: #f6f6f6;
  --bg-footer: #fff;
  --bg-dark-gray: #e0e0e0;
  --bg-second-light: #f4f4f4;
  --bg-second-light: #f4f4f4;

  --text-primary: #000000;
  --text-default: #1f2933;
  --text-light-primary: #3e4c59;
  --text-secondary: #00000050;
  --text-tab-title: #7f817c;
  --text-disabled: #969696;
  --text-disabled: #969696;
  --text-form-label: #1f2933;
  --text-header-table: #0f100d;
  --text-note: #00000034;
  --text-description: #777777;
  --text-form-icon: #41433f;
  --text-footer: #000;
  --text-placeholder: #808080;
  --text-error: #d10000;

  --border-color: #d7d7d7;
  --border-color-light: #EFEFEF;

  --border-radius: 8px;
  --border-radius-checkbox: 4px;
  --border-radius-card: 10px;

  --scrollbar-thumb: #b7b6c2;
  --scrollbar-track: #f0f3fa;

  --color-gray: #808080;
  --color-green: #4fcea2;
  --color-brightGreen: #4cd964;
  --color-red: #2C3546;
  --color-blue: #0992d0;
  --color-orange: #f5a623;
  --color-darkOrange: #f67800;
  --color-pink: #f75d81;
  --color-limeGreen: #4fcea2;
  --color-lightGreen: #3ebac2;
  --color-blueShade: #2d7fd3;
  --color-yellow: #ffca28;
  --color-violet: #665ca7;
  --color-purple: #ac009f;
  --color-d2: #d2d2d2;
  --color-black: #000000;
  --color-45: #454545;

  --shadow: 5px 5px 10px rgba(220, 220, 220, 0.2);

  --font-size-s: 12px;
  --font-size-m: 14px;
  --font-size-l: 16px;
  --font-size-xl: 20px;
  --font-size-xxl: 26px;
  --font-size-xxxl: 36px;
  --font-size-xxxxl: 51px;
  --font-size-normal: 22px;

  --font-family: Poppins, sans-serif;
  --font-title: Poppins, sans-serif;
}

  .note {
    font-size: 12px;
    color: ${({ theme }) => theme.text.note};
  }
  .black {
    color: ${({ theme }) => theme.text.primary};
  }
  & > * {
    font-family: var(--font-family);
  }

  * {
    font-family: var(--font-family);
  }
  body {
    font-family: var(--font-family);
  }
  
  p {
    white-space: pre-line;
  }
  .anticon:before {
    display: block;
    font-family: 'anticon', 'duc-tri-dashboard' !important;
  }
  .anticon:after {
    display: block;
    font-family: 'anticon', 'duc-tri-dashboard' !important;
  }
  .text-primary {
    color: var(--primary);
  }
  .description {
    color: var(--text-secondary);
  }

  .bg-gray {
    background: #E7E7E7;
    border-color:#E7E7E7;
  }
  
  
  .text-headerTable {
    color: ${({ theme }) => theme.palette.headerTable};
  }
  .bg-primary {
    background: ${({ theme }) => theme.background.primary};
  }
  .bg-warning {
    background: ${({ theme }) => theme.background.warning};
  }
  .bg-error {
    background: ${({ theme }) => theme.background.error};
  }
  .t-14px-1\\.57 {
    font: normal normal 14px/1.57 ${({ theme }) => theme.fonts.primary};
  }
  .t-500-14px-1\\.57 {
    font: normal 500 14px/1.57 ${({ theme }) => theme.fonts.primary};
  }
  .t-500-16px-1\\.5 {
    font: normal 500 16px/1.5 ${({ theme }) => theme.fonts.header};
  }
  .t-500-24px-1\\.17 {
    font: normal 500 16px/1.17 ${({ theme }) => theme.fonts.header};
  }
  .ml-8px {
    margin-left: 8px;
  }
  .ant-card-body {
    padding-top: 20px
  }

  /* ------------------ Override antd---------------- */
  .ant-pagination .ant-pagination-item-active a {
    color: #000000;
  }

  .ql-editor {
    min-height: 200px;
  }
  .ant-form-item-label {
    label {
      color: #000;
      font-family: Montserrat;
      font-size: 14px;
      font-weight: 600;
    }
    margin-bottom: 10px;
  }

  .form-label {
      color: #000;
      font-family: Montserrat;
      font-size: 14px;
      margin-bottom: 10px;
      font-weight: 600;

  }
  b, strong {
    font-weight: 600;
  }
  .d-none {
    display:none !important;
  }
  .text-highlight {
    color: var(--client-primary);
  }

  .bg-client-primary {
    background: var(--client-primary);
    border-color: var(--client-primary);
  }

  .ant-space {
    display: flex;
  }
  .ant-space-vertical {
    width: 100%;
  }
  .space-between {
    justify-content:space-between;
  }
    .html-content {
      border-radius:10px;
      width: 100%;
      background: white;
      word-break: break-word;
      img {
        max-width: 200px;
        max-height: 200px;
        object-fit:contain;
      }
    }
    .label {
      display: flex;
      align-items:center;
      svg {
        margin-right:5px;
      }
      path {
        fill: rgba(0, 0, 0, 0.45);
      }
    }
    .ant-input-number {
      width: 100%;
    }
    .highlight{
      color:#FF6F00;
    }
    .note {
      color: #707070;
    }
    .ant-select-item-option-selected {
      .ant-select-item-option-content {
        color: white !important;
      }
    }
    .ant-layout {
      background:#fff;
    }

  .center {
    text-align: center;
  }
  .no-label {
    label {
      display: none;
    }
  }
  .size-16 {
    font-size: 16px;
  }
  .semi-bold {
    font-weight: 600;
  }  
  .ant-card-head {
    font-weight: 600;
    font-size: 16px;
  }
  .d-flex {
    display:flex;
    align-items:center;
  }
  .flex-end {
    align-items: flex-end;
    justify-content:flex-end;
  }
  .right {
    text-align: right;
  }
  .ant-layout.ant-layout-has-sider>.ant-layout, .ant-layout.ant-layout-has-sider>.ant-layout-content {
    width: auto;
  }
  .ant-picker-time-panel-column > li.ant-picker-time-panel-cell-selected .ant-picker-time-panel-cell-inner {
      color: white;
  }
  .txt-dark {
    color:#000;
  }

  .card-info {
    display: flex;
    background-color: #f9f9f9;
    border-radius: 10px;
    .ant-card-body {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  .txt-grey {
    color:#828282;
  }

  .overlay-print-content {
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    padding: 10px;
    background: white;
    z-index: 99999;
  }
  .ant-tabs-nav {
    margin-bottom: 0px;
    .ant-tabs-tab {
      opacity: 0.8;
    }
  }
  .ant-tabs-tab-active {
      opacity: 1;
      ${'' /* background-color: #000 !important; */}
      ${'' /* color: white !important; */}
      ${'' /* padding: 10px 20px; */}
      ${
        '' /* & > * {
        color: white !important;
      } */
      }
    }
  .btn-dark-outlined {
    border:2px solid #000;
    color:#000;
  }

  .btn-green {
    background: #1acdb3;
    border-color: #1acdb3;
    color:white;
  }
  .btn-orange {
    background: #f36c08;
    border-color: #f36c08;
    color:white;
  }

  .btn-blue {
    background:#1E76B3 ;
      border-color: #1E76B3;
    color:white;
  }


  .btn-gray {
    background:#EFEFEF ;
      border-color: #EFEFEF;
    color:#2C3546;
  }
  

  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::after {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: Montserrat, sans-serif;
    line-height: 1;
    content: '*';
  }
  .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before {
    display: none;
  }
  .ant-pagination-item-active {
    background-color: #000;
  }
  .preview-image {
    width: 50px;
    height: 50px;
    margin: 5px 0px !important;
  }
  .cover-image {
    width: 100%;
    image {
      width: 100%;
    }
  }
  .bf-container {
    border:1px solid var(--border-color);
  }
  .p-0 {
    padding:0px;
  }
  .ant-timeline-item-head {
    background-color: var(--primary);
  }
  .ant-upload.ant-upload-select-picture-card {
    background-color: white;
  }

  /* START fix style Preview Image */
  .ant-image-preview-img-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ant-image-preview-mask {
    background: rgba(0, 0, 0, 0.8) !important;
    
  }
  .ant-image-preview-operations {
    .anticon-rotate-left, .anticon-rotate-right {
      display: none;
    }
  }

  .show-fixed {
    position:fixed;
    top:60;
    left:0;
    right:0;
    bottom:0;
    width: 100vw;
    z-index:999999;
    height: calc(100vh - 60px);
  }
  /* END fix style Preview Image */

  .form-item-d-none .ant-form-item-control-input {
    display: none;
  }

  .text-disabled {
    color: rgba(0, 0, 0, 0.25);
  }
  .ant-spin-nested-loading {
    width:100%;
  }
  #btn-collapse {
    pointer-events: auto;
    position:fixed;
    top: 15px;
    z-index: 2;
  }
`;

export default AppWrapper;
