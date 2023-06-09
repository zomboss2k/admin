import styled from 'styled-components';

export default styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: padding-left 0.3s ease 0.1s, padding-right 0.3s ease 0.1s,
    position 0 ease 0.3s;
  .extraAction {
    margin-bottom: 0.5em;
    margin-left: 15px;
  }
  h1,
  .ant-breadcrumb-link {
    font-size: 30px;
    font-weight: 600;
    color: ${({ theme }) => theme.text.primary};
    ${
      '' /* flex: 1;
    display: flex;
    align-items: center;
    white-space: nowrap; */
    }

    ${
      '' /* @media only screen and (max-width: 767px) {
      margin: 0 10px;
    } */
    }

    &:before {
      ${
        '' /* content: '';
      width: 5px;
      height: 40px;
      background-color: ${({ theme }) => theme.palette.color[1]};
      display: flex;
      margin: 0 15px 0 0; */
      }
    }

    &:after {
      ${
        '' /* content: '';
      width: 100%;
      height: 1px;
      background-color: ${({ theme }) => theme.palette.color[1]};
      display: flex;
      margin-left: 15px; */
      }
    }
  }
`;
