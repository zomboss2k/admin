import { forwardRef } from 'react';
import { Radio, Space } from 'antd';
import i18next from 'i18next';
import get from 'lodash/get';
import RestInputItem from 'components/RestInput/RestInputItem';

// eslint-disable-next-line
const RadioInput = forwardRef(
  (
    {
      resourceData,
      valueProp = 'value',
      titleProp = 'text',
      direction = ' vertical',
      ...props
    },
    ref,
  ) => (
    <Radio.Group className="w-full" ref={ref} {...props}>
      <Space size={14} direction={direction}>
        {resourceData.map((e) => (
          <Radio value={get(e, valueProp)} key={get(e, valueProp)}>
            <div className="promotion-title">
              {i18next.t(get(e, titleProp))}
            </div>
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  ),
);

const RestRadioInput = (props) => (
  <RestInputItem {...props} ContentComponent={RadioInput} />
);

export default RestRadioInput;
