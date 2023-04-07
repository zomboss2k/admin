import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import { FormItemWrapper } from './styles';

const FormItemUI = ({
  source,
  header,
  required,
  requiredMessage,
  defaultValue,
  ruleType,
  rules,
  children,
  valuePropName,
  className,
  formOptions,
  disabled,
  label,
  subfix,
  noStyle,
  allowNull,
  ...props
}) => {
  const { t } = useTranslation();
  return (
    <FormItemWrapper
      className={className}
      label={
        header || label ? (
          <>
            {t(label || header)}
            {subfix}
          </>
        ) : null
      }
      name={source}
      noStyle={noStyle}
      {...props}
      rules={[
        {
          required,
          message: t(requiredMessage, { field: t(label || header) }),
        },
        ...ruleType !== undefined ? [{
          type: ruleType,
          message: `${t('error.validateType')} ${t(
            ruleType || 'ruleType.string',
          )}`,
        }] : [],
        ...rules,
      ]}
      normalize={(value) => normalize(ruleType, value, allowNull)}
      initialValue={
        defaultValue && defaultValue !== 'undefined'
          ? normalize(ruleType, defaultValue)
          : undefined
      }
      valuePropName={
        ruleType === 'boolean'
          ? valuePropName || 'checked'
          : valuePropName || 'value'
      }
      {...formOptions}
    >
      {React.cloneElement(children, {
        ...props,
        disabled,
      })}
    </FormItemWrapper>
  );
};

const normalize = (ruleType, value, allowNull) => {
  switch (ruleType) {
    case 'number':
      return value === null ? (allowNull ? null : 0) : Number(value);
    case 'array':
      return Array.isArray(value)
        ? value
        : value?.split(',')?.filter((e) => e) || [];
    default:
      return value;
  }
};

FormItemUI.propTypes = {
  source: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  header: PropTypes.any,
  subfix: PropTypes.any,
  required: PropTypes.bool,
  requiredMessage: PropTypes.node,
  form: PropTypes.object,
  defaultValue: PropTypes.any,
  rules: PropTypes.array,
  valuePropName: PropTypes.string,
  ruleType: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  formOptions: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};
FormItemUI.defaultProps = {
  required: false,
  requiredMessage: 'error.required',
  rules: [],
  // formOptions: { trigger: 'onBlur' },
  disabled: false,
  children: <Input />,
};

export default FormItemUI;
