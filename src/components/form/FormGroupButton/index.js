import PropTypes from 'prop-types';
import { Form, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import { useContext, useMemo } from 'react';
import get from 'lodash/get';
import FormGroupButtonStyles from './styles';
import { RestInputContext } from '../../RestInput/RestInputContext';
import { YES_NO_SWITCH } from 'configs/localData/constants';

function 
FormGroupButton({
  name,
  label,
  labelPosition = 'left',
  resourceData = YES_NO_SWITCH,
  initialValue,
  formItemProps,
  valueProp = 'value',
}) {
  const { t } = useTranslation();
  const { record } = useContext(RestInputContext);

  const defaultValue = useMemo(() => {
    const value = get(record, name);
    if (typeof value === 'undefined') return initialValue;
    return value;
  }, [record]); // eslint-disable-line

  return (
    <FormGroupButtonStyles className={`label-position-${labelPosition}`}>
      <Form.Item
        initialValue={defaultValue}
        name={name}
        label={t(label)}
        {...formItemProps}
      >
        <Radio.Group buttonStyle="solid">
          {resourceData?.map((item, idx) => (
            <Radio.Button key={String(idx)} value={item[valueProp]}>
              {t(item.text)}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
    </FormGroupButtonStyles>
  );
}

FormGroupButton.propTypes = {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
  resourceData: PropTypes.array,
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  formItemProps: PropTypes.object,
};

export default FormGroupButton;
