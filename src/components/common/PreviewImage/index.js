import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { isImage } from 'api/uploadMedia';
import { EyeOutlined } from '@ant-design/icons';
import { getImageUrl } from 'utils/tools';
import { PreviewWrapper } from './styles';
import styled from 'styled-components';

const PreviewImage = ({ src, onPreview, className }) => {
  const [previewVisible, setPreviewVisible] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const handleCancel = () => {
    setPreviewVisible(null);
  };

  const onPreviewUI = (item) => {
    if (onPreview) {
      onPreview(item);
    } else {
      setPreviewVisible(true);
      setPreviewImage(item);
    }
  };
  return (
    <PreviewWrapper className={className}>
      {isImage(src) ? (
        <img
          src={getImageUrl(src)}
          className={className || 'image'}
          alt={src}
        />
      ) : (
        <video src={src} style={{ width: '100px' }}>
          <track kind="captions" />
        </video>
      )}
      {src && (
        <div className="overlay">
          <EyeOutlined onClick={() => onPreviewUI(src)} />
        </div>
      )}
      <ModalWrapper open={previewVisible} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          src={getImageUrl(previewImage)}
        />
      </ModalWrapper>
    </PreviewWrapper>
  );
};

const ModalWrapper = styled(Modal)`
  .ant-modal-close {
    right: -20px;
    top: -20px;
    background: #fff;
    border: 1px solid #efefef;

    .ant-modal-close-x {
      width: 40px;
      height: 40px;
      font-size: 16px;
      font-style: normal;
      line-height: 40px;
    }
  }
`;

PreviewImage.propTypes = {
  src: PropTypes.string,
  onPreview: PropTypes.func,
  className: PropTypes.string,
};

export default PreviewImage;
