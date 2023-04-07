import { Col, Form, Row } from 'antd';
import PropTypes from 'prop-types';
import { RestInputContext } from 'components/RestInput/RestInputContext';
import RestSelect from 'components/RestInput/RestSelect';
import get from 'lodash/get';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

function FormVNAddress({
  disabled = {},
  required,
  provinceName = 'provinceId',
  districtsName = 'districtId',
  wardName = 'wardId',
  isShowWard = true,
}) {
  const cities = useSelector((state) => state.config.address);
  const { form } = useContext(RestInputContext);

  const onChangeCity = () => {
    form.setFields([
      {
        name: districtsName,
        value: null,
      },
      {
        name: wardName,
        value: null,
      },
    ]);
  };

  const onChangeDistrict = () => {
    form.setFields([
      {
        name: wardName,
        value: null,
      },
    ]);
  };

  return (
    <Row gutter={[14, 14]}>
      <Col md={12} sm={24} xs={24}>
        <RestSelect
          disabled={disabled.province}
          selectProps={{ allowClear: false }}
          source={provinceName}
          resourceData={cities}
          required={required}
          titleProp="name"
          valueProp="id"
          header="input.city.label"
          placeholder="input.city.placeholder"
          onChange={onChangeCity}
        />
      </Col>
      <Col md={12} sm={24} xs={24}>
        <Form.Item
          noStyle
          shouldUpdate={(p, c) => get(p, provinceName) !== get(c, provinceName)}
        >
          {({ getFieldValue }) => (
            <RestSelect
              disabled={disabled.district}
              selectProps={{ allowClear: false }}
              source={districtsName}
              required={required}
              titleProp="name"
              valueProp="id"
              header="input.district.label"
              placeholder="input.district.placeholder"
              resourceData={
                cities?.find((city) => city.id === getFieldValue(provinceName))
                  ?.districts
              }
              onChange={onChangeDistrict}
            />
          )}
        </Form.Item>
      </Col>
      {isShowWard && (
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            noStyle
            shouldUpdate={(p, c) =>
              get(p, districtsName) !== get(c, districtsName)
            }
          >
            {({ getFieldValue }) => (
              <RestSelect
                disabled={disabled.ward}
                selectProps={{ allowClear: false }}
                source={wardName}
                required={required}
                titleProp="name"
                valueProp="id"
                header="input.ward.label"
                placeholder="input.ward.placeholder"
                resourceData={
                  cities
                    ?.find((city) => city.id === getFieldValue(provinceName))
                    ?.districts?.find(
                      (district) =>
                        district.id === getFieldValue(districtsName),
                    )?.wards
                }
              />
            )}
          </Form.Item>
        </Col>
      )}
    </Row>
  );
}

FormVNAddress.propTypes = {
  disabled: PropTypes.object,
  required: PropTypes.bool,
  provinceName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  districtsName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  wardName: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  isShowWard: PropTypes.bool,
};

export default FormVNAddress;
