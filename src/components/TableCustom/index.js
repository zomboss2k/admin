import { useCallback } from 'react';
import { PropTypes } from 'prop-types';

import TableWrapper from './styles';

const TableCustom = ({
  columns,
  data,
  xScroll,
  pagination,
  isResetStyle,
  className,
  ...props
}) => {
  const rowKey = (data = {}, index) => (data.id || index);

  const showTotal = useCallback(
    (total, range) => `${range[0]}-${range[1]}/${total}`,
    [],
  );

  return (
    <TableWrapper
      isResetStyle={isResetStyle}
      columns={columns}
      dataSource={data}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal,
      }}
      rowKey={rowKey}
      scroll={{ x: xScroll || 1100 }}
      {...props}
      className={`${className || ''} ${isResetStyle ? '' : 'table-wrapper'}`}
    />
  );
};

TableCustom.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  xScroll: PropTypes.any,
  pagination: PropTypes.object,
  isResetStyle: PropTypes.bool,
  className: PropTypes.string,
};

TableCustom.defaultProps = {
  pagination: {},
};

export default TableCustom;
