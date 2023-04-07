import PropTypes from 'prop-types';
import { Typography, Button, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';

import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import { RestInputContext } from 'components/RestInput/RestInputContext';
import React, { useContext } from 'react';
import FormStyles from './styles';

const FormListAddition = ({
  children,
  name,
  title,
  formatInitialValue = value => value,
  defaultValueItem,
  className,
  addMoreTitle = 'button.addMore',
  isHiddenAddMore,
}) => {
  const { t } = useTranslation();

  const { record } = useContext(RestInputContext);

  const value = get(record, name);

  const initialValue = isEmpty(value) ? [{}] : formatInitialValue(value);

  return (
    <FormStyles className={`${className || ''} form-list__list-wrapper`}>
      {title && <Typography.Title level={4}>{t(title)}</Typography.Title>}

      <div className="form-list__list">
        <Form.List name={name} initialValue={initialValue}>
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(field => (
                <div key={field.key} className="form-list__list-item">
                  {React.cloneElement(children, {
                    field,
                  })}
                  {!isHiddenAddMore && (
                    <CloseCircleFilled
                      className="form-list__remove-button"
                      onClick={() => remove(field.name)}
                    />
                  )}
                </div>
              ))}
              {!isHiddenAddMore && (
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add(defaultValueItem)}
                    icon={<PlusOutlined />}
                    className="w-full"
                  >
                    {t(addMoreTitle)}
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              )}
            </>
          )}
        </Form.List>
      </div>
    </FormStyles>
  );
};

FormListAddition.propTypes =  {
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  title: PropTypes.string,
  formatInitialValue: PropTypes.func,
  defaultValueItem: PropTypes.any,
  children: PropTypes.any,
  className: PropTypes.string,
  addMoreTitle: PropTypes.string,
}

export default FormListAddition;
