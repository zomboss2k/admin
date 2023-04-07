import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const SearchInput = ({ onTextSearch, defaultValue, placeholder }) => {
  const { t } = useTranslation();
  return (
    <Input
      className="h-30 w-250 mt-15 mb-15"
      // style={{
      //   margin: '15px 0',
      // }}
      defaultValue={defaultValue}
      placeholder={t(placeholder)}
      prefix={<SearchOutlined style={{ color: '#41433f' }} size={14} />}
      onPressEnter={(e) => onTextSearch(e.currentTarget.value)}
    />
  );
};
SearchInput.propTypes = {
  onTextSearch: PropTypes.func,
  defaultValue: PropTypes.string,
  // placeholder: PropTypes.string,
};

export default SearchInput;
