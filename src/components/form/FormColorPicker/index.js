import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Popover, Button, Form } from 'antd';
import { SketchPicker } from 'react-color';
import { RestInputContext } from 'components/RestInput/RestInputContext';
import FormItemUI from '../FormItem';

const RestColorPicker = (props) => {
  const { source, defaultValue } = props;
  const { form } = useContext(RestInputContext);

  const handleChangeComplete = (color) => {
    form.setFieldsValue({ [source]: color.hex });
  };
  return (
    <Form.Item shouldUpdate>
      {() => (
        <FormItemUI {...props} defaultValue={defaultValue}>
          <Popover
            content={
              <SketchPicker
                color={form.getFieldValue(source)}
                onChangeComplete={handleChangeComplete}
              />
            }
            placement="bottom"
            trigger="click"
          >
            <Button
              block
              style={{
                textAlign: 'left',
                color: form.getFieldValue(source) || '#000',
              }}
            >
              <div>{form.getFieldValue(source) || '#000'}</div>
            </Button>
          </Popover>
        </FormItemUI>
      )}
    </Form.Item>
  );
};

RestColorPicker.propTypes = {
  form: PropTypes.object,
  record: PropTypes.object,
  source: PropTypes.string,
  defaultValue: PropTypes.any,
};

export default RestColorPicker;
