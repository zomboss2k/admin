import styled from 'styled-components';

const FormPhoneInputStyles = styled.div`
  .react-tel-input {
    font-family: var(--font-family) !important;
    font-size: 14px;
    width: 100%;
    background: var(--bg-input);
    height: 45px;
    border-radius: 0;
    input {
      width: 100%;
      background: #fff;
      height: 45px;
    }
    .flag-dropdown {
      background: #fff;
    }
    .flag-dropdown, .selected-flag {
      border-radius: 2px 0 0 2px;
    }
    .form-control {
      border-radius: 2px;
    }
  }

  .combine-input-label {
    background: var(--bg-input);
    border-radius: 10px;
    .ant-form-item-label {
      padding: 10px 0 0 12px !important;
      font-weight: bold;
      font-size: 10px;
      line-height: 12px;
    }
    .flag-dropdown,
    input:hover,
    input:focus,
    input:active,
    input {
      border-color: var(--bg-input) !important;
      background: var(--bg-input) !important;
      box-shadow: none;
    }
    .flag-dropdown {
      padding-left: 10px;
    }
    .selected-flag {
      padding-left: 0 !important;
      background: var(--bg-input) !important;
    }
  }
`;

export default FormPhoneInputStyles;
