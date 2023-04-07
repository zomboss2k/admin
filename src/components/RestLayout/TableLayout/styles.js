import styled from 'styled-components';
import { Table } from 'antd';

export const HeaderTableWrapper = styled.input`
  background: transparent;
  border: 1px dashed transparent;
  transition: all 0.3s;
  padding-left: 5px;
  transform: translate(-5px, 0px);
  text-transform: uppercase;
  &:hover {
    border: 1px dashed ${({ theme }) => theme.border.default};
  }
  &:focus {
    border: 1px dashed ${({ theme }) => theme.palette.primary};
    outline: none;
    background: ${({ theme }) => theme.background.content};
    transform: translate(0px, 0px);
  }
  &:disabled {
    border: 1px dashed transparent;
  }
  .highlightFilter {
    color: ${({ theme }) => theme.palette.primary};
  }
`;

export const IconWrapper = styled.div`
  &.highlightFilter {
    color: ${({ theme }) => theme.palette.primary} !important;
  }
`;

export const DropdownStyles = styled.div`
  .search-button {
    i {
      color: white;
    }
  }
`;

export const TableStyles = styled(Table)`
  .ant-table-content {
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
  }
  .ant-table-cell {
    & > div {
      min-height: 32px;
      display: flex;
      align-items: center;
    }

    .ant-empty {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    a {
      font-weight: 600;
    }
  }
  ${
    '' /* // .ant-table-cell > div {
  //   width: auto !important;
  // } */
  }
  .ant-table-thead > tr > th {
    background: ${({ theme }) => theme.table.headerBackground} !important;
    color: ${({ theme }) => theme.table.headerColor} !important;
    font-size: 13px !important;
    font-weight: 600 !important;
  }
  .ant-table-tbody > tr:last-child > td {
    border: none !important;
  }
  .ant-table-tbody > tr {
    font-size: 12px;
  }
  tr.drop-over-downward td {
    border-bottom: 2px dashed #1890ff;
  }

  tr.drop-over-upward td {
    border-top: 2px dashed #1890ff;
  }
  .ant-table-thead
    > tr
    > th
    > div
    > label
    > span.ant-checkbox
    > span.ant-checkbox-inner {
    display: none !important;
  }

  .ant-table-tbody
    > tr
    > td
    > label
    > span.ant-checkbox
    > span.ant-checkbox-inner {
    border-radius: 50% !important;
  }
`;
