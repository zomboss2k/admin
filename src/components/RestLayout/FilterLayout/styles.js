import styled from 'styled-components';
import { Form } from 'antd';

export const FilterFormWrapper = styled(Form)`
  margin: auto;
  ${'' /* background: ${({ theme }) => theme.background.content}; */}
  .filterContainer {
    display: flex;
    @media only screen and (max-width: 768px) {
      flex-direction: column;
    }
  }
  .filterContent {
    flex: 1;
    justify-content: flex-end;
    margin-right: 10px;
    & > div {
      display: flex;
      justify-content: space-between;
      .ant-form-item {
        margin-bottom: 0;
        .ant-form-item-control {
          line-height: normal;
        }
      }
    }
    @media only screen and (max-width: 576px) {
      margin-right: 0px;
    }
  }
  .filterActions {
    @media only screen and (max-width: 768px) {
      display: block;
      width: 100%;
      .ant-row > .ant-col {
        margin-bottom: 15px;
      }
    }
  }
  .border {
  }
  .filterButton {
    width: 100%;
    font-size: 14px;
  }
  .clearButton {
    background: ${({ theme }) => theme.background.disabled};
    color: white;
  }
  .ant-form-item {
    margin-bottom: 0px;
    margin-right: -1px;
  }
  .ant-form-item-label label {
    color: ${({ theme }) => theme.text.itemLabel};
  }
`;
