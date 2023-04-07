import PropTypes from 'prop-types';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const SelectUser = ({ disabled, resourceData, onChange }) => {
  const { t } = useTranslation();

  return (
    <Select
      disabled={disabled}
      mode="multiple"
      onChange={onChange}
      placeholder={t('placeholder.undefined')}
    >
      {resourceData.map((data) => (
        <Option key={data.id} value={data.id}>
          {data.displayName}
        </Option>
      ))}
    </Select>
  );
};
SelectUser.propTypes = {
  resourceData: PropTypes.array,
  disabled: PropTypes.func,
  onChange: PropTypes.func,
};

export default SelectUser;
