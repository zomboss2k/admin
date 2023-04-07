import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login as loginAction } from '@redux/auth/actions';
import Logo from '../../assets/images/devticloudLogo.png';

const FormItem = Form.Item;

const Login = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const login = (params) => dispatch(loginAction(params));
  const handleSubmit = () => {
    // e.preventDefault();
    form
      .validateFields()
      .then((values) => {
        login(values);
      })
      .catch(() => {
        // console.log('err', err);
      });
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div className="title">
        <img alt="" src={Logo} className="logo" />
      </div>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
          <Input
            placeholder={t('input.email.placeholder')}
            autoComplete="off"
            style={{ height: '40px' }}
          />
        </FormItem>
        <FormItem
          name="password"
          rules={[
            {
              required: true,
              message: t('input.password.validateMsg.required'),
            },
          ]}
        >
          <Input.Password
            style={{ height: '40px' }}
            placeholder={t('input.password.placeholder')}
            autoComplete="off"
            type="password"
          />
        </FormItem>
        <div
          style={{
            marginBottom: 20,
            fontSize: '14px',
            textAlign: 'right',
            fontWeight: '600',
          }}
        >
          {/* <Link to="/forgot-password" href="/forgot-password">
            {t('forgotPassword.title')}
          </Link> */}
        </div>
        <div className="action-div">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="login-form-button"
            style={{ height: '42px' }}
          >
            {t('login.loginBtn')}
          </Button>
        </div>
      </Form>
    </>
  );
};

Login.propTypes = {};

export default Login;
