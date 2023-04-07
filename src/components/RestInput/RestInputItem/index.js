import { Input } from 'antd';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { getRecordData } from 'utils/tools';
import FormItem from '../../form/FormItem';
import { RestInputContext } from '../RestInputContext';

const RestInputItem = ({
  ContentComponent,
  isReference,
  children,
  format,
  placeholder,
  onChange,
  formatter,
  parser,
  ruleType,
  noStyle,
  ...props
}) => {
  const { record, form } = useContext(RestInputContext);
  return isReference ? (
    React.cloneElement(children, {
      record,
      source: props.source,
      fieldKey: props.fieldKey,
    })
  ) : (
    <FormItem
      {...props}
      form={form}
      noStyle={noStyle}
      ruleType={ruleType}
      defaultValue={
        format(getRecordData(record, props.source)) ||
        format(props.defaultValue)
      }
      name={props.source}
    >
      <ContentComponent
        {...props}
        formatter={formatter}
        parser={parser}
        onChange={onChange}
        record={record}
        placeholder={i18next.t(placeholder)}
      />
    </FormItem>
  );
};

RestInputItem.propTypes = {
  source: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  record: PropTypes.object,
  defaultValue: PropTypes.any,
  ContentComponent: PropTypes.any,
  isReference: PropTypes.bool,
  children: PropTypes.any,
  format: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

RestInputItem.defaultProps = {
  ContentComponent: Input,
  format: (data) => data,
};

export default RestInputItem;
