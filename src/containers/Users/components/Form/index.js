import RestInputItem from 'components/RestInput/RestInputItem';
import PropTypes from 'prop-types';

import { Col, Input, Row, Form, Switch, Card } from 'antd';
import { useSelector } from 'react-redux';
import RestSelect from 'components/RestInput/RestSelect';
import { useTranslation } from 'react-i18next';
import RestAvatarInput from 'components/RestInput/RestAvatarInput';

const UsersForm = ({ isEdit }) => {
  const roles = useSelector((state) => state.config.data?.roles);
  const { t } = useTranslation();

  return (
    <div>
      {/* <RestInputItem source="name" header="users.name" /> */}
      <Row gutter={[16, 16]}>
        <Col md={8}>
          <RestAvatarInput
            className="avatar-section"
            source="avatar"
            header="users.avatar"
          />
        </Col>
        <Col md={16}>
          <Card title="Infor">
            <Row gutter={16}>
              <Col span={12}>
                <RestInputItem
                  required
                  source="firstName"
                  header="users.firstName"
                />
              </Col>
              <Col span={12}>
                <RestInputItem
                  required
                  source="lastName"
                  header="users.lastName"
                />
              </Col>
            </Row>
            <RestInputItem required source="username" header="users.username" />
            <RestInputItem required source="email" header="users.email" />
            <RestInputItem source="phone" header="users.phone" />
            <RestSelect
              required
              source="role"
              header="users.role"
              resourceData={roles.map((e) => ({
                value: e.value,
                text: e.label,
              }))}
              valueProp="value"
              titleProp="text"
            />
            {!isEdit && (
              <>
                {' '}
                <RestInputItem
                  required
                  ContentComponent={Input.Password}
                  source="password"
                  header="users.password"
                />
                <Form.Item
                  dependencies={['password']}
                  required
                  label={t('users.confirmPassword')}
                  hasFeedback
                  name="confirmPassword"
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            'The two passwords that you entered do not match!',
                          ),
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </>
            )}
            <RestInputItem
              ContentComponent={Switch}
              valuePropName="checked"
              source="isGenie"
              ruleType="boolean"
              header="users.isGenie"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

UsersForm.propTypes = {
  isEdit: PropTypes.bool,
};

export default UsersForm;
