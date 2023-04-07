import styled from 'styled-components';
import { Table } from 'antd';

const TableWrapper = styled(Table)`
  &.table-wrapper {
    padding: 12px;
    background: ${({ theme }) => theme.background.content};
    border-radius: 8px;
  }

  .ant-table-pagination.ant-pagination {
    margin-top: 25px;
  }
  .ant-table-thead > tr:first-child > th {
    background: ${({ theme }) => theme.table.headerBackground};
    font-weight: 700;
  }
  .ant-table-scroll .ant-table-body {
    overflow-x: auto !important;
  }
  .ant-dropdown-trigger .anticon {
    font-size: 14px;
  }
`;

export default TableWrapper;
