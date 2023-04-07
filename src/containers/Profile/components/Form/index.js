import { Col, Row } from 'antd';
import { RestInputContext } from 'components/RestInput/RestInputContext';
import RestInputItem from 'components/RestInput/RestInputItem';
import PropTypes from 'prop-types';
import FormStyles from './styles';

const Form = ({ form, record }) => (
  <RestInputContext.Provider value={{ form, record }}>
    {/* <RestAvatarInput
        style={{
          marginBottom: 30,
          width: 150,
          height: 150,
          borderRadius: '50%',
        }}
        className="avatar-section"
        
        
        cropDimension={{ width: 300, height: 300 }}
        
        source="artist.avatar"
      /> */}
    <FormStyles>
      <Row gutter={16} className="form-section">
        {/* <Col span={24}>
            <RestInputItem
              defaultValue={record?.username}
              source="username"
              header="profile.username"
            />
          </Col> */}
        <Col span={12}>
          <RestInputItem
            required
            source="firstName"
            header="profile.firstName"
          />
        </Col>
        <Col span={12}>
          <RestInputItem required source="lastName" header="profile.lastName" />
        </Col>
        <Col span={12}>
          <RestInputItem source="email" header="profile.email" disabled />
        </Col>
      </Row>
    </FormStyles>
  </RestInputContext.Provider>
);

Form.propTypes = {
  form: PropTypes.object,
  record: PropTypes.object,
};

export default Form;
