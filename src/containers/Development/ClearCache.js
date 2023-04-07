import { clearCache } from '@redux/config/actions';
import { useDispatch } from 'react-redux';
import { Form, Button, Select } from 'antd';

const ClearCache = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleClearCache = (values) => {
    dispatch(clearCache(values))
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleClearCache}>
      <Form.Item name="key" label="Key" rules={[{ required: true }]}>
        <Select>
          {['config', 'product', 'cms', 'address', 'productDetail'].map(e => (
            <Select.Option key={e} value={e}>
              {e}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Clear Cache
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ClearCache;
