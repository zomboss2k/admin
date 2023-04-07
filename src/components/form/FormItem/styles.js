import styled from 'styled-components';
import { Form } from 'antd';

const FormItem = Form.Item;

export const FormItemWrapper = styled(FormItem)`
  .ant-form-item-label {
    label {
      color: ${({ theme }) => theme.text.formLabel};
      font-family: Montserrat;
      font-size: 14px;
      font-weight: 600;
      &:after {
        content: '';
      }
    }
    margin-bottom: 0px;
  }
`;
