import PropTypes from 'prop-types';
import {
  DeleteOutlined,
  EyeOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from 'utils/tools';
import { Tag } from 'antd';

const UploadImageItem = ({
  defaultSourceKey,
  onSetDefault,
  onMouseEnter,
  onMouseLeave,
  item,
  onPreviewUI,
  deleteImage,
  isDefault,
}) => {
  const { t } = useTranslation();

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="uploadImage"
    >
      {item.status !== 'done' && <LoadingOutlined className="loading" />}
      <img
        className="image"
        src={getImageUrl(item.response || item.url)}
        alt={item.url}
      />
      <div className="overlay">
        <EyeOutlined
          onClick={() =>
            onPreviewUI({ ...item, url: item.response || item.url })
          }
        />
        <DeleteOutlined onClick={() => deleteImage(item)} />
      </div>
      {isDefault && <Tag className="main-image">Main</Tag>}
      {defaultSourceKey ? (
        <div
          role="presentation"
          onClick={() => onSetDefault(item)}
          className={`lbSetDefault`}
        >
          {t('button.setDefault')}
        </div>
      ) : null}
    </div>
  );
};
UploadImageItem.propTypes = {
  item: PropTypes.object,
  onPreviewUI: PropTypes.func,
  deleteImage: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onSetDefault: PropTypes.func,
  defaultSourceKey: PropTypes.string,
  isDefault: PropTypes.bool,
};

export default UploadImageItem;
