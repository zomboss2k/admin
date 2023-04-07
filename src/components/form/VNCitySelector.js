import { Col, Form } from 'antd';
import RestSelect from 'components/RestInput/RestSelect';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { useState, useContext } from 'react';
import { RestInputContext } from 'components/RestInput/RestInputContext';

export default function VNCitySelector({ disabled = {}, required, rootSource }) {
  const { form } = useContext(RestInputContext);
  const provinceSource = `${rootSource ? `${rootSource}.` : ''}provinceId`
  const cities = useSelector((state) => state.config.address);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const selectCity = (e) => {
    const selectedCity = cities?.find((city) => city.id === e);
    setDistricts(selectedCity.districts);
    form.setFieldsValue({
      districtId: null,
    });
    return e;
  };

  const selectDistrict = (e) => {
    setWards(districts.find((district) => district.id === e)?.wards);
    form.setFieldsValue({
      wardId: null,
    });
    return e;
  };

  return (
    <>
      <Col md={12} sm={24} xs={24}>
        <RestSelect
          disabled={disabled.province}
          selectProps={{ allowClear: false }}
          source={provinceSource}
          resourceData={cities}
          required={required}
          titleProp="name"
          valueProp="id"
          formOptions={{ getValueFromEvent: selectCity }}
          header="city"
        />
      </Col>
      <Col md={12} sm={24} xs={24}>
        <RestSelect
          disabled={disabled.district}
          selectProps={{ allowClear: false }}
          source={`${rootSource ? `${rootSource}.` : ''}districtId`}
          resourceData={districts}
          required={required}
          titleProp="name"
          valueProp="id"
          header="district"
          formOptions={{ getValueFromEvent: selectDistrict }}
        />
      </Col>
      <Col md={12} sm={24} xs={24}>
        <RestSelect
          disabled={disabled.ward}
          selectProps={{ allowClear: false }}
          source={`${rootSource ? `${rootSource}.` : ''}wardId`}
          resourceData={wards}
          required={required}
          titleProp="name"
          valueProp="id"
          header="ward"
        />
      </Col>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, curValues) => {
          const selectedCity = cities?.find(
            (city) => city.id === get(curValues, provinceSource),
          );
          if (
            !districts?.length &&
            get(curValues, provinceSource) &&
            selectedCity?.districts
          ) {
            setDistricts(selectedCity.districts);
          }
          if (
            get(prevValues, provinceSource) !== get(curValues, provinceSource) &&
            selectedCity?.districts
          ) {
            setDistricts(selectedCity?.districts);
          }
          if (
            !wards?.length &&
            get(curValues, `${rootSource ? `${rootSource}.` : ''}districtId`) &&
            selectedCity?.districts
          ) {
            setWards(
              selectedCity?.districts?.find(
                (district) => district.id === get(curValues, `${rootSource ? `${rootSource}.` : ''}districtId`),
              )?.wards,
            );
          }
          if (
            get(prevValues, `${rootSource ? `${rootSource}.` : ''}districtId`) !== get(curValues, `${rootSource ? `${rootSource}.` : ''}districtId`) &&
            selectedCity?.districts
          ) {
            setWards(
              selectedCity?.districts?.find(
                (district) => district.id === get(curValues, `${rootSource ? `${rootSource}.` : ''}districtId`),
              )?.wards,
            );
          }
          return true;
        }}
      >
        {() => null}
      </Form.Item>
    </>
  );
}
