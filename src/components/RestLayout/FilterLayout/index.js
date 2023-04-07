import { Form } from 'antd';
import _, { zipObjectDeep } from 'lodash';
import PropTypes from 'prop-types';
import { RestInputContext } from '../../RestInput/RestInputContext';
import { FilterFormWrapper } from './styles';

const FormComponent = ({ format, resourceFilter, children, retrieveList }) => {
  const [form] = Form.useForm();
  const onFilter = () => {
    form.validateFields().then((values) => {
      const parseToObj = zipObjectDeep(Object.keys(values), _.values(values));
      retrieveList({ filter: format(parseToObj) });
    });
  };
  const onClear = () => {
    retrieveList({ filter: {} });
    setTimeout(() => {
      form.resetFields();
    }, 0);
  };

  const onValuesChange = (changedValues, allValues) => {
    const parseToObj = zipObjectDeep(
      Object.keys(allValues),
      _.values(allValues),
    );
    retrieveList({ filter: format(parseToObj) });
  };

  return (
    <FilterFormWrapper
      onValuesChange={onValuesChange}
      layout="vertical"
      form={form}
    >
      <div className="filterContainer">
        <div className="filterContent">
          <RestInputContext.Provider
            value={{
              form,
              record: resourceFilter.filter || {},
              handleSubmit: onFilter,
              onClear,
            }}
          >
            {children}
          </RestInputContext.Provider>
        </div>
        {/* <div className="filterActions">
          <Space size={10} className="w-full">
            <Button
              type="primary"
              onClick={onFilter}
              className="filterButton"
            >
              {t('button.filter')}
            </Button>
            <Button onClick={onClear} className="filterButton clearButton">
              {t('button.clearFilter')}
            </Button>
          </Space>
        </div> */}
      </div>
    </FilterFormWrapper>
  );
};

FormComponent.propTypes = {
  children: PropTypes.node,
  retrieveList: PropTypes.func,
  format: PropTypes.func,
  resourceFilter: PropTypes.object,
};

FormComponent.defaultProps = {
  format: (values) => values,
};

export default FormComponent;
