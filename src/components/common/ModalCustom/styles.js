import styled from 'styled-components';
import { Modal } from 'antd';

export const ModalWrapper = styled(Modal)`
  min-height: 30%;
  max-width: calc(100vw - 16px);

  &.reset-top-body .ant-modal-body {
    padding-top: 0 !important;
  }

  .ant-modal-content {
    overflow: hidden;
  }

  .ant-modal-header {
    border: none;
  }

  .ant-modal-body {
    overflow-y: auto;
  }

  .ant-modal-title {
    font-size: 18px;
  }
  .ant-modal-close,
  .ant-modal-close-icon,
  .ant-modal-close-x > .anticon {
    font-size: 18px;
  }

  .multi-upload-wrapper .ant-form-item:not(:first-child) {
    display: none;
  }
  .multi-upload-wrapper .ant-form-item:first-child {
    margin-bottom: 10px;
  }

  textarea,
  .ant-input,
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
  .ant-select-selection,
  .ant-input-number,
  .ant-select-dropdown-menu-item,
  .ant-select-dropdown-menu,
  .ant-select-dropdown,
  .ant-select-clear-icon,
  .ant-select-dropdown-menu-vertical {
    &:hover,
    &:focus,
    &:active {
      border: 1px solid var(--primary);
    }
  }

  .ant-input-affix-wrapper {
    border-radius: var(--border-radius) ant-input {
      border: none;
    }
  }

  .ant-input-affix-wrapper-focused {
    border: 1px solid var(--primary) !important;
  }

  .ant-select-selection__clear {
    background-color: transparent;
    color: white;
    border-radius: 5px;
  }
  .ant-select-arrow-icon {
    background-color: transparent;
  }
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .ant-modal-footer {
    border: none;
    padding: 24px;
    button:not(:first-child) {
      margin-left: 15px;
    }
  }
  .ant-calendar-picker,
  .ant-select {
    width: 100%;
  }

  .ant-form-item-control {
    line-height: 2;
  }

  .ant-form-item-label {
    line-height: 1.5em;
    padding-bottom: 5px;
  }
  .ant-input-number,
  .ant-picker {
    width: 100%;
  }
  .ant-form-item .ant-form-item-explain {
    margin-top: 3px;
  }
  .ant-input-number {
    border-radius: var(--border-radius);
  }
`;
