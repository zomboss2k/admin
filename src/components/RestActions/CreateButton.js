import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  && {
  }
`;

const CreateButton = ({ header, gotoCreatePage, source }) => {
  const { t } = useTranslation();
  return (
    <StyledButton
      icon={<PlusOutlined />}
      source={source}
      type="primary"
      onClick={gotoCreatePage}
    >
      <span className="t-500-14px-1.57">{t(header)}</span>
    </StyledButton>
  );
};
CreateButton.propTypes = {
  gotoCreatePage: PropTypes.func,
  header: PropTypes.string,
  source: PropTypes.string,
};

CreateButton.defaultProps = {
  source: 'create',
  header: 'button.create',
};

export default CreateButton;
