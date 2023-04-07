import { LockOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import MaterialInput from 'components/common/MaterialInput';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { registerWithToken as registerWithTokenAction } from '@redux/auth/actions';
import FormUploadAvatar from '../../components/form/FormUploadAvatar';

const FormItem = Form.Item;

const Invite = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();
  const register = (params) => dispatch(registerWithTokenAction(params));

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const token = history.location.search.replace('?token=', '');
      if (
        values.password === values.confirmPassword &&
        values.password.length >= 6
      ) {
        register({
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          avatar: values.avatar,
          token,
        });
      }
    });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <div className="title">
        <span>{t('register.title')}</span>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <FormUploadAvatar
          style={{
            width: 100,
            height: 100,
            margin: 'auto',
            marginBottom: 20,
          }}
          source="avatar"
        />
        <Row gutter={16}>
          <Col span={12}>
            <FormItem
              name="firstName"
              rules={[
                {
                  required: true,
                  message: t('input.firstName.validateMsg.required'),
                },
              ]}
            >
              <MaterialInput placeholder={t('input.firstName.placeholder')} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name="lastName"
              rules={[
                {
                  required: true,
                  message: t('input.lastName.validateMsg.required'),
                },
              ]}
            >
              <MaterialInput placeholder={t('input.lastName.placeholder')} />
            </FormItem>
          </Col>
        </Row>
        <FormItem
          name="password"
          rules={[
            {
              required: true,
              message: t('input.password.validateMsg.required'),
            },
          ]}
        >
          <MaterialInput
            placeholder={t('input.password.placeholder')}
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
          />
        </FormItem>
        <FormItem
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: t('input.confirmPassword.validateMsg.required'),
            },
          ]}
        >
          <MaterialInput
            placeholder={t('input.confirmPassword.placeholder')}
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
          />
        </FormItem>
        <div className="action-div">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {t('button.submit')}
          </Button>
        </div>
      </Form>
    </div>
  );
};

Invite.propTypes = {};

export default Invite;
