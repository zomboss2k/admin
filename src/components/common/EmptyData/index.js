import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
// import emptyImage from 'assets/images/empty.png';
import { PlusOutlined } from '@ant-design/icons';
import EmptyDataWrapper from './styles';
import Text from '../Text';

const EmptyData = ({ resource, isShowCreate, gotoCreatePage }) => {
  const { t } = useTranslation();
  return (
    <EmptyDataWrapper>
      <div className="empty-content">
        {/* <div className="icon">
          <img src={emptyImage} alt="" />
        </div> */}
        <div className="text center">
          <Text align="center" type="h4">
            <span className="description">{t(`${resource}.empty.title`)}</span>
          </Text>
          {/* <Text align="center" type="h5Gray">
            {t(`${resource}.empty.subTitle`)}
          </Text> */}
        </div>
        {isShowCreate && (
          <Button
            className="mt-30 mb-30"
            size="large"
            onClick={gotoCreatePage}
            icon={<PlusOutlined />}
            type="primary"
          >
            {t(`${resource}.add`)}
          </Button>
        )}
      </div>
    </EmptyDataWrapper>
  );
};

EmptyData.propTypes = {
  resource: PropTypes.string,
  gotoCreatePage: PropTypes.func,
  isShowCreate: PropTypes.bool,
};
export default EmptyData;
