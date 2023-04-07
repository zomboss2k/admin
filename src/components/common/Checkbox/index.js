import { Checkbox } from 'antd';
import i18next from 'i18next';

const CustomCheckbox = ({ title, ...props }) => (
  <Checkbox {...props}>
    {i18next.t(title)}
  </Checkbox>
)

export default CustomCheckbox;
