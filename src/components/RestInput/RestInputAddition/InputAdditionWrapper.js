import styled from 'styled-components';

export const InputAdditionWrapper = styled.div`
  border: 1px solid #f0f0f0;

  .ant-list-empty-text {
    display: none;
  }

  .ant-list-item {
    padding-left: 20px;
    word-break: break-all;
  }

  .ant-list-item-meta {
    align-items: center;
  }
  .buttonRow {
    justify-content: flex-end;
  }
  .inputRow {
    display: flex;
  }
  .input {
    flex: 1;
    margin-right: 10px;
  }
  .btnAdd {
    ${'' /* margin-top: 20px; */}
    border-radius: 0;
    border: 1px solid #f0f0f0;
    width: 100%;
    text-align: left;
    padding: 12px 20px;
    height: auto;
  }
`;
