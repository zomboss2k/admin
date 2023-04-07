import { AutoComplete, Form, InputNumber, Row, Col } from 'antd';
import { isEmpty, get, set } from 'lodash';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

const RestGoogleAutocomplete = ({
  header,
  required,
  debounce,
  messageRequire,
  placeholder,
  wrapperCol,
  defaultValue,
  form,
  record,
  source,
  rules,
  latSource,
  longSource,
  hideGeoCode,
}) => {
  const { t } = useTranslation();
  const [coordinates, setCoordinates] = useState({});
  useEffect(() => {
    if (!isEmpty(record) && isEmpty(coordinates)) {
      setCoordinates({
        lat: get(record, latSource),
        lng: get(record, longSource),
      });
      const values = form.getFieldsValue();
      set(values, latSource, get(record, latSource));
      set(values, longSource, get(record, longSource));
      form.setFieldsValue(values);
    }
    // eslint-disable-next-line
  }, [record]);
  const {
    suggestions: { status, data },
    setValue,
  } = usePlacesAutocomplete({
    debounce,
  });
  const handleChange = (e) => {
    setValue(e);
    // onChange(form, e);
    const values = form.getFieldsValue();
    set(values, source, e);
    form.setFieldsValue(values);
  };

  const handleSelect = async (e) => {
    const values = form.getFieldsValue();
    set(values, source, e);
    form.setFieldsValue(values);
    try {
      const results = await getGeocode({ address: e });
      const coordinateResults = await getLatLng(results[0]);
      setCoordinates(coordinateResults);
      const values = form.getFieldsValue();
      set(values, latSource, coordinateResults.lat);
      set(values, longSource, coordinateResults.lng);
      form.setFieldsValue(values);
    } catch (error) {
      console.log(error);
    }
  };

  const renderSuggestions = data.map((suggestion) => {
    const {
      // eslint-disable-next-line
      structured_formatting: { main_text, secondary_text },
    } = suggestion;
    // eslint-disable-next-line
    return `${main_text} ${secondary_text}`;
  });

  return (
    <>
      <Form.Item
        wrapperCol={wrapperCol}
        label={t(header || 'text.googleAddress')}
        name={source}
        initialValue={defaultValue}
        rules={[
          {
            required,
            message: messageRequire || t('input.address.validateMsg.required'),
          },
          ...rules,
        ]}
      >
        <AutoComplete
          dataSource={status === 'OK' && renderSuggestions}
          onSearch={handleChange}
          onChange={handleSelect}
          placeholder={placeholder}
        />
      </Form.Item>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item
            name={latSource}
            {...(hideGeoCode
              ? {
                  noStyle: true,
                }
              : {
                  label: 'Lat',
                })}
          >
            <InputNumber {...(hideGeoCode && { style: { display: 'none' } })} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={longSource}
            {...(hideGeoCode
              ? {
                  noStyle: true,
                }
              : {
                  label: 'Long',
                })}
          >
            <InputNumber {...(hideGeoCode && { style: { display: 'none' } })} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

RestGoogleAutocomplete.propTypes = {
  source: PropTypes.string,
  header: PropTypes.string,
  required: PropTypes.bool,
  debounce: PropTypes.number,
  messageRequire: PropTypes.string,
  placeholder: PropTypes.string,
  wrapperCol: PropTypes.object,
  form: PropTypes.object,
  record: PropTypes.object,
  defaultValue: PropTypes.string,
  rules: PropTypes.array,
  latSource: PropTypes.string,
  longSource: PropTypes.string,
  hideGeoCode: PropTypes.bool,
};

RestGoogleAutocomplete.defaultProps = {
  required: true,
  hideGeoCode: true,
  debounce: 600,
  wrapperCol: { span: 24 },
  rules: [],
  latSource: 'coordinates.latitude',
  longSource: 'coordinates.longitude',
};

export default RestGoogleAutocomplete;
