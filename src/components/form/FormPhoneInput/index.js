import PropTypes, { string } from 'prop-types';
import { Form } from 'antd';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import FormPhoneInputStyles from './styles';
import { useTranslation } from 'react-i18next';
import { validateRegex } from 'utils/validateUtils';

const FormPhoneInput = ({
  name,
  label,
  required,
  messageRequire = 'input.phone.validateMsg.required',
  rules,
  combineInputLabel,
  inputExtraProps,
  defaultCountry,
}) => {
  const { t } = useTranslation();

  return (
    <FormPhoneInputStyles>
      <Form.Item
        className={combineInputLabel ? 'combine-input-label' : ''}
        label={t(label)}
        name={name}
        rules={[
          {
            required,
            message: t(messageRequire),
          },
          {
            pattern: validateRegex.phone,
            message: t('input.phone.validateMsg.invalid'),
          },
          ...rules,
        ]}
      >
        <ReactPhoneInput
          inputExtraProps={inputExtraProps}
          country={defaultCountry}
          onlyCountries={['vn']}
          // onChange={handleOnChange}
          enableAreaCodes
          enableSearch
          // defaultMask='...-...-...'
          // alwaysDefaultMask
        />
      </Form.Item>
    </FormPhoneInputStyles>
  );
};

FormPhoneInput.propTypes = {
  name: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  label: PropTypes.string,
  required: PropTypes.bool,
  messageRequire: PropTypes.string,
  rules: PropTypes.array,
  combineInputLabel: PropTypes.bool,
  defaultCountry: string,
  inputExtraProps: PropTypes.object,
};

FormPhoneInput.defaultProps = {
  rules: [],
  messageRequire: 'input.phone.validateMsg.required',
  defaultCountry: 'vn',
};

export default FormPhoneInput;
