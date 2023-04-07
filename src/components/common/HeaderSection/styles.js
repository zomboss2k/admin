import styled from 'styled-components';

export const HeaderSectionWrapper = styled.div`
  text-transform: capitalize;
  font-weight: 600;
  font-size: 16px;
  color: #000;
  .anticon {
    margin-right: 10px;
    font-size: 14px;
  }
  @media only screen and (max-width: 640px) {
    font-size: 16px;
  }
`;
