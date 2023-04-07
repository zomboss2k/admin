import styled from 'styled-components';

const EmptyDataWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: auto;
  ${'' /* border: 1px dashed #979797; */}
  border-radius: 5px;
  padding-top: 40px;
  min-height: 300px;

  .icon {
    line-height: 1;
  }
  i {
    font-size: 100px;
    color: #b3b3b3;
  }
  .empty-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

export default EmptyDataWrapper;
