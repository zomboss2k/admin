import styled from 'styled-components';

const FormGroupButtonStyles = styled.div`
  .ant-radio-button-wrapper {
    border-radius: ${({ theme }) => theme.borderRadius.button} !important;
    &:before {
      display: none;
    }
  }
  .ant-radio-button-wrapper:not(.ant-radio-button-wrapper-checked) {
    background: #f6f6f6;
    border-color: #f6f6f6;
  }
  .ant-radio-button-wrapper-checked {
    color: ${({ theme }) => theme.text.btnPrimaryColor} !important;
  }
  .ant-radio-group .ant-radio-button-wrapper:not(:first-child) {
    margin-left: 13px;
  }
  &.label-position-left {
    .ant-form-item {
      flex-direction: row;
    }

    .ant-form-item-control {
      flex-grow: unset;
    }

    .ant-form-item-label {
      flex-grow: 1;
      padding-bottom: 0;
      display: flex;
      align-items: center;
    }
  }
`;

export default FormGroupButtonStyles;
