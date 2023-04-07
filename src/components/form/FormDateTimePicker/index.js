import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker, TimePicker, Form } from 'antd';
import FormItemUI from '../FormItem';
import { DateTimePickerWrapper } from './styles';

const normalize = (value, isShowDate, formatTime) => {
  if (isShowDate && moment(value).isValid()) return moment(value);
  if (!isShowDate && moment(value).isValid())
    return moment(value).format(formatTime);
  if (!isShowDate && moment(value, formatTime).isValid())
    return moment(value, formatTime).format(formatTime);
  return undefined;
};

const FormDatePicker = (props) => {
  const {
    isShowTime,
    isShowDate,
    required,
    defaultValue,
    initialValue,
    formOptions,
    source,
    form,
    disabled,
    isShowTimeInDate,
    formatDate,
    formatTime,
    allowClear,
    dateProps,
  } = props;
  const [value, setValue] = useState(
    (defaultValue || initialValue) && !form.getFieldValue(source)
      ? normalize(defaultValue || initialValue, isShowDate, formatTime)
      : form.getFieldValue(source),
  );

  const config = {
    rules: [{ type: 'object' }],
    initialValue:
      defaultValue || initialValue
        ? moment(defaultValue || initialValue)
        : undefined,
    ...formOptions,
  };
  const getValueFromEvent = (value) => {
    if (!value) {
      props.formOptions &&
        props.formOptions.getValueFromEvent &&
        props.formOptions.getValueFromEvent(value);
      setValue(value);
      return value;
    }
    const e = isShowDate ? value?.toISOString() : value?.format(formatTime);
    props.formOptions &&
      props.formOptions.getValueFromEvent &&
      props.formOptions.getValueFromEvent(e);
    setValue(e);
    return e;
  };
  return (
    <DateTimePickerWrapper>
      <FormItemUI
        {...props}
        formOptions={{
          getValueFromEvent,
          normalize: (value) => normalize(value, isShowDate, formatTime),
        }}
        ruleType={isShowDate ? 'object' : 'string'}
        defaultValue={
          defaultValue || initialValue
            ? normalize(defaultValue || initialValue, isShowDate, formatTime)
            : undefined
        }
        className="title"
        required={required}
        name={source}
      >
        <div>
          {isShowDate && (
            <Form.Item name={source} {...config}>
              <DatePicker
                {...dateProps}
                allowClear={allowClear}
                disabled={disabled}
                format={formatDate}
                className="viewDatePicker"
                style={{ display: isShowDate ? 'block' : 'none' }}
                showTime={isShowTimeInDate}
              />
            </Form.Item>
          )}
          {isShowTime && (
            <TimePicker
              disabled={disabled}
              onChange={(newDate) => {
                form.setFieldsValue({
                  [source]: isShowDate ? newDate : newDate.format(formatTime),
                });
                formOptions.getValueFromEvent &&
                  formOptions.getValueFromEvent(
                    isShowDate
                      ? newDate?.toISOString()
                      : newDate.format(formatTime),
                  );
                setValue(
                  isShowDate
                    ? newDate?.toISOString()
                    : newDate.format(formatTime),
                );
              }}
              style={{ marginBottom: 10 }}
              value={
                isShowDate
                  ? value && moment(value)
                  : value && moment(value, formatTime)
              }
              format={formatTime}
              allowClear={false}
              className="viewTimePicker"
            />
          )}
        </div>
      </FormItemUI>
    </DateTimePickerWrapper>
  );
};

FormDatePicker.propTypes = {
  source: PropTypes.string,
  header: PropTypes.any,
  required: PropTypes.bool,
  requiredMessage: PropTypes.node,
  icon: PropTypes.string,
  form: PropTypes.object,
  defaultValue: PropTypes.any,
  initialValue: PropTypes.object,
  formOptions: PropTypes.object,
  dateProps: PropTypes.object,
  disabled: PropTypes.bool,
  isShowTime: PropTypes.bool,
  isShowDate: PropTypes.bool,
  formatDate: PropTypes.string,
  formatTime: PropTypes.string,
};

FormDatePicker.defaultProps = {
  isShowTime: true,
  isShowDate: true,
  formOptions: {},
  formatDate: 'ddd - MMM DD YYYY',
  formatTime: 'HH:mm',
};

export default FormDatePicker;
