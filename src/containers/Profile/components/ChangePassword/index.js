import { changePassword } from '@redux/auth/actions';
import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const ProfileDetail = () => {
  const { t } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  const [confirmLoading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onConfirm = () => {
    form.submit();
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      setLoading(true);
      dispatch(
        changePassword({
          password: values.password,
          currentPassword: values.currentPassword,
        }),
      )
        .then(() => {
          setIsShow(false);
          setLoading(false);
          form.resetFields();
        })
        .catch(() => {
          setLoading(false);
        });
    });
  };

  return (
    <div>
      <Button type="secondary" onClick={() => setIsShow(true)}>
        {t('button.changePassword')}
      </Button>
      <Modal
        confirmLoading={confirmLoading}
        onCancel={() => setIsShow(false)}
        title={t('button.changePassword')}
        open={isShow}
        onOk={onConfirm}
      >
        <Form onFinish={handleSubmit} layout="vertical" form={form}>
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              {
                required: true,
                message: 'Please input your current password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'The two passwords that you entered do not match!',
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

ProfileDetail.propTypes = {};

ProfileDetail.defaultProps = {};

export default ProfileDetail;
