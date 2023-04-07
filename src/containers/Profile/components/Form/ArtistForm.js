import { useContext, useState } from 'react';
import RestInputItem from 'components/RestInput/RestInputItem';
import { Col, Card, Input, InputNumber, Row, Switch } from 'antd';
import RestSelect from 'components/RestInput/RestSelect';
import RestReferenceInput from 'containers/rest/ReferenceInput';
import RestMultiLocale from 'components/RestInput/RestMultiLocale';

import { RestInputContext } from 'components/RestInput/RestInputContext';
import { CITIES, COUNTRIES } from 'data';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SocialLinks from './SocialLinks';

const ArtistsForm = () => {
  const { form, record } = useContext(RestInputContext);
  const values = form.getFieldsValue();
  const [country, setCountry] = useState(values?.country);
  const user = useSelector((state) => state.auth.data);
  const { t } = useTranslation();
  const selectCountry = (value) => {
    setCountry(value);
    return value;
  };

  return (
    <div>
      <Card title={t('profile.artistInfo')}>
        {user.role === 'ADMIN' && (
          <RestInputItem isReference>
            <RestReferenceInput
              initialFilter={{ filter: { role: 'ARTIST' } }}
              source="artist.userId"
              resource="users"
            >
              <RestSelect
                header="artists.user"
                source="artist.userId"
                titleProp="firstName"
                formatText={(data, record) =>
                  `${record?.firstName} ${record?.lastName}`
                }
                valueProp="id"
              />
            </RestReferenceInput>
          </RestInputItem>
        )}
        <RestInputItem source="artist.name" header="artists.name" />
        <Row gutter={16}>
          <Col xs={12}>
            <RestInputItem
              ruleType="number"
              ContentComponent={InputNumber}
              source="artist.yearBorn"
              header="artists.yearBorn"
            />
            <RestSelect
              resourceData={COUNTRIES}
              valueProp="name"
              titleProp="name"
              source="artist.countryBorn"
              header="artists.countryBorn"
              formatText={(text, data) => `${data.emoji} ${text}`}
            />
            <RestInputItem source="artist.email" header="artists.email" />

            <RestInputItem
              ruleType="boolean"
              ContentComponent={Switch}
              source="artist.isActive"
              header="artists.isActive"
            />
          </Col>
          <Col xs={12}>
            <RestInputItem
              ruleType="number"
              ContentComponent={InputNumber}
              source="artist.yearDied"
              header="artists.yearDied"
            />
            <RestInputItem
              source="artist.phoneNumber"
              header="artists.phoneNumber"
            />
            <RestSelect
              resourceData={COUNTRIES}
              valueProp="name"
              titleProp="name"
              source="artist.nationality"
              header="artists.nationality"
              formatText={(text, data) => `${data.emoji} ${text}`}
            />
            <RestInputItem
              ruleType="boolean"
              ContentComponent={Switch}
              source="artist.isVerified"
              header="artists.isVerified"
            />
          </Col>
        </Row>
        <RestInputItem isReference>
          <RestReferenceInput source="artist.artTypeIds" resource="artTypes">
            <RestSelect
              ruleType="array"
              selectProps={{ mode: 'multiple' }}
              header="artists.artTypeIds"
              source="artist.artTypeIds"
              titleProp="name"
              valueProp="id"
            />
          </RestReferenceInput>
        </RestInputItem>
        <RestMultiLocale
          renderItem={(props) => (
            <RestInputItem {...props} ContentComponent={Input.TextArea} />
          )}
          source="artist.description"
          header="artists.description"
        />
      </Card>
      <Card className="mt-30" title={t('profile.currentLocation')}>
        <RestInputItem source="artist.address" header="artists.address" />
        <RestInputItem
          source="artist.additionalAddress"
          header="artists.additionalAddress"
        />
        <RestSelect
          resourceData={COUNTRIES}
          valueProp="name"
          titleProp="name"
          source="artist.country"
          formOptions={{ getValueFromEvent: selectCountry }}
          header="artists.country"
          formatText={(text, data) => `${data.emoji} ${text}`}
        />
        <Row gutter={16}>
          <Col md={8}>
            <RestSelect
              resourceData={CITIES[country || record.country] || []}
              valueProp="name"
              titleProp="name"
              source="artist.province"
              header="artists.province"
            />
          </Col>
          <Col md={8}>
            <RestSelect
              resourceData={CITIES[country || record.country] || []}
              valueProp="name"
              titleProp="name"
              source="artist.city"
              header="artists.city"
            />
          </Col>
          <Col md={8}>
            <RestInputItem source="artist.zipCode" header="artists.zipCode" />
          </Col>
        </Row>
      </Card>
      <SocialLinks />
    </div>
  );
};

ArtistsForm.propTypes = {};

export default ArtistsForm;
