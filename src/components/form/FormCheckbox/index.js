import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import FormItem from '../FormItem';

const CheckboxGroup = Checkbox.Group;
const FormCheckbox = ({
  header,
  required,
  placeholder,
  defaultValue,
  dataResource,
  valueProp,
  titleProp,
  ...props
}) => (
  <FormItem
    {...props}
    header={header}
    required={required}
    defaultValue={defaultValue}
  >
    <CheckboxGroup placeholder={placeholder}>
      {dataResource.map((data) => (
        <Checkbox key={data[valueProp]} value={data[valueProp]}>
          {data[titleProp]}
        </Checkbox>
      ))}
    </CheckboxGroup>
  </FormItem>
);

FormCheckbox.propTypes = {
  header: PropTypes.any,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.any,
  dataResource: PropTypes.any,
  valueProp: PropTypes.string,
  titleProp: PropTypes.string,
};
FormCheckbox.defaultProps = {
  required: false,
  requiredMessage: 'error.required',
  rules: [],
};

export default FormCheckbox;
