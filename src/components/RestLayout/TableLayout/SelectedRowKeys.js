import { Alert } from 'antd';
import PropTypes from 'prop-types';
export default function SelectedRowKeys({
  children,
  title,
  classNameSelectedRow,
}) {
  return (
    <Alert
      message={title}
      className={`mb-30 ${classNameSelectedRow}`}
      action={children}
    />
  );
}
SelectedRowKeys.propTypes = {
  title: PropTypes.string,
};
