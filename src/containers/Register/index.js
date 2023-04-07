import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import MaterialInput from 'components/common/MaterialInput';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register as registerAction } from '@redux/auth/actions';
import { validateRegex } from '../../utils/validateUtils';

const FormItem = Form.Item;

const Register = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const register = (params) => dispatch(registerAction(params));

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields().then((values) => {
      if (values.password === values.comfirm && values.password.length >= 6) {
        register({
          username: values.username,
          email: values.email,
          password: values.password,
        });
      }
    });
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback(t('input.confirmPassword.validateMsg.match'));
    } else {
      callback();
      console.log('err');
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <div className="title">
        <span>{t('register.title')}</span>
      </div>
      <Form form={form} layout="vertical">
        <FormItem
          name="fullName"
          rules={[
            {
              required: true,
              message: t('input.fullName.validateMsg.required'),
            },
            {
              pattern: validateRegex.fullName,
              message: t('error.fullname'),
            },
          ]}
        >
          <MaterialInput
            placeholder={t('input.fullName.placeholder')}
            prefix={
              <MailOutlined
                style={{
                  color: 'rgba(0,0,0,.25)',
                }}
              />
            }
          />
        </FormItem>
        <FormItem
          name="email"
          rules={[
            {
              required: true,
              message: t('input.email.validateMsg.required'),
            },
            {
              type: 'email',
              message: t('input.email.validateMsg.invalid'),
            },
          ]}
        >
          <MaterialInput
            placeholder={t('input.email.placeholder')}
            prefix={
              <MailOutlined
                style={{
                  color: 'rgba(0,0,0,.25)',
                }}
              />
            }
          />
        </FormItem>
        <FormItem
          name="password"
          rules={[
            {
              required: true,
              message: t('input.password.validateMsg.required'),
            },
            {
              pattern: validateRegex.password,
              message: t('error.password'),
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
          hasFeedback
          name="comfirm"
          rules={[
            {
              required: true,
              message: t('input.confirmPassword.validateMsg.required'),
            },
            { validator: compareToFirstPassword },
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
            onClick={handleSubmit}
            type="primary"
            className="login-form-button"
          >
            {t('button.submit')}
          </Button>
          <div style={{ marginTop: 30 }}>
            <span style={{ marginRight: 5 }}>{t('login.question')}</span>
            <Link to="/login">{t('login.loginBtn')}</Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

Register.propTypes = {};

export default Register;
