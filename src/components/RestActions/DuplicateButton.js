import { CopyOutlined } from '@ant-design/icons';
import { createPromotions } from '@redux/promotions/actions';
import { Button, Modal } from 'antd';
import { omit } from 'lodash';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { generateCode } from 'utils/tools';

const StyledButton = styled(Button)`
  && {
  }
`;

const DuplicateButton = ({ record, source }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleDuplicate = () => {
    console.log(record);
    Modal.confirm({
      title: t('promotions.confirmCone'),
      onOk: () => {
        setLoading(true);
        dispatch(
          createPromotions({
            data: {
              ...omit(record, ['id', 'createdAt', 'updatedAt']),
              isActive: false,
              code: record?.code ? generateCode() : undefined,
            },
          }),
        ).finally(() => {
          setLoading(false);
        });
      },
    });
  };
  return (
    <StyledButton
      icon={<CopyOutlined />}
      source={source}
      type="primary"
      loading={loading}
      onClick={handleDuplicate}
    ></StyledButton>
  );
};
DuplicateButton.propTypes = {
  gotoCreatePage: PropTypes.func,
  header: PropTypes.string,
  source: PropTypes.string,
};

DuplicateButton.defaultProps = {
  source: 'create',
  header: 'button.create',
};

export default DuplicateButton;
