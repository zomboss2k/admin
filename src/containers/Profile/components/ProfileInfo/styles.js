import styled from 'styled-components';

export default styled.div`
  ${'' /* background: ${({ theme }) => theme.background.content}; */}
  height: 100%;
  .action-section {
    display: flex;
    justify-content: flex-end;
    .ant-btn {
      font-size: 20px;
      font-weight: 500;
      height: auto;
      padding: 10px 20px;
      margin-left: 10px;
    }
  }
`;
