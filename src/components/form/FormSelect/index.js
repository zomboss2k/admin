import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18next';
import { Select, Spin } from 'antd';
import { Waypoint } from 'react-waypoint';
import { map, isObject, get } from 'lodash';
import { getRecordData, onSearch as onChangeSearch } from 'utils/tools';
import FormItem from '../FormItem';
import { SelectWrapper } from './style';

const { Option } = Select;
class FormSelect extends Component {
  onSelectOption = (inputValue, option) => {
    if (
      onChangeSearch(
        isObject(option.props.children)
          ? getRecordData(
              option.props.children.props && option.props.children.props.record,
              this.props.searchKey,
            )
          : option.props.children,
        inputValue,
      )
    ) {
      return option.props.value;
    }
    return null;
  };

  render() {
    const {
      allowClear,
      header,
      required,
      placeholder,
      defaultValue,
      disabled,
      resourceData,
      valueProp,
      titleProp,
      children,
      onSearch,
      onChange,
      format,
      className,
      loading,
      selectProps,
      formatText,
      onEnter,
      isFilterOption,
      onChangeGetSelectedItem,
      ...props
    } = this.props;
    const handleChange = (value) => {
      if (!onChangeGetSelectedItem) return;
      const findItem = resourceData?.find(
        (item) => get(item, valueProp) === value,
      );

      onChangeGetSelectedItem(value, findItem);
    };

    return (
      <FormItem
        ruleType={Array.isArray(defaultValue) ? 'array' : 'string'}
        {...props}
        disabled={disabled}
        placeholder={i18n.t(placeholder)}
        header={header && i18n.t(header)}
        required={required}
        defaultValue={
          defaultValue?.map?.((e) => e?.id || e) ||
          defaultValue?.id ||
          defaultValue
        }
        name={this.props.source}
        fieldKey={this.props.fieldkey}
      >
        <SelectWrapper
          placeholder={i18n.t(placeholder)}
          filterOption={isFilterOption ? this.onSelectOption : false}
          showSearch
          allowClear={allowClear}
          className={className}
          onSearch={(value) => onSearch(value)}
          onChange={onChange || handleChange}
          {...selectProps}
          autoComplete="new-password"
        >
          {map(format ? format(resourceData) : resourceData, (data) =>
            children ? (
              <Option
                key={valueProp ? getRecordData(data, valueProp) : data}
                value={valueProp ? getRecordData(data, valueProp) : data}
              >
                {React.cloneElement(children, {
                  key: valueProp ? getRecordData(data, valueProp) : data,
                  record: data,
                  valueProp,
                  titleProp,
                })}
              </Option>
            ) : (
              <Option
                key={valueProp ? getRecordData(data, valueProp) : data}
                value={valueProp ? getRecordData(data, valueProp) : data}
              >
                {formatText(
                  titleProp ? getRecordData(data, titleProp) : data,
                  data,
                )}
              </Option>
            ),
          )}
          <Option key="loading" disabled value="loadingTracking">
            <Waypoint onEnter={onEnter} />
            {loading && (
              <div className="loading">
                <Spin />
              </div>
            )}
          </Option>
        </SelectWrapper>
      </FormItem>
    );
  }
}

FormSelect.propTypes = {
  allowClear: PropTypes.bool,
  source: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  header: PropTypes.any,
  required: PropTypes.bool,
  requiredMessage: PropTypes.node,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  form: PropTypes.object,
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  resourceData: PropTypes.any,
  valueProp: PropTypes.string,
  titleProp: PropTypes.string,
  children: PropTypes.node,
  rules: PropTypes.array,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  format: PropTypes.func,
  searchKey: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.bool,
  selectProps: PropTypes.object,
  formatText: PropTypes.func,
  record: PropTypes.object,
  onEnter: PropTypes.func,
  isFilterOption: PropTypes.bool,
};

FormSelect.defaultProps = {
  required: false,
  requiredMessage: 'error.required',
  rules: [],
  placeholder: 'placeholder.undefined',
  onSearch: () => {},
  formatText: (data) => i18n.t(data),
  selectProps: {},
  valueProp: 'value',
  titleProp: 'text',
  allowClear: true,
  isFilterOption: true,
};

export default FormSelect;
