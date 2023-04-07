import { Tag, Popover } from 'antd';
import PropTypes from 'prop-types';
import { EllipsisOutlined } from '@ant-design/icons';

export default function Tags({ data = [], titleProp }) {
  const content = (
    <div>
      {data.slice(3, data?.length || 0)?.map((e, index) => (
        <Tag key={String(index)}>{e?.[titleProp] || JSON.stringify(e)}</Tag>
      ))}
    </div>
  );

  return (
    <div>
      {data.slice(0, 2)?.map((e, index) => (
        <Tag key={String(index)}>{e?.[titleProp] || JSON.stringify(e)}</Tag>
      ))}
      {data.length > 3 && (
        <Popover content={content}>
          <Tag>
            <EllipsisOutlined />
          </Tag>
        </Popover>
      )}
    </div>
  );
}

Tags.propTypes = {
  data: PropTypes.array,
  titleProp: PropTypes.string,
};
