import styled from 'styled-components';

const UploadImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  ${'' /* border: dashed 1px ${({ theme }) => theme.border.default}; */}
  border-radius: 5px;

  .ant-upload {
    width: 100%;
    height: 100%;
  }
  .cropModal {
    z-index: 2;
  }
  .header-label {
    text-align: center;
    font-size: 22px;
    font-weight: 600;
    margin-top: 20px;
    color: #000;
    background: transparent !important;
  }
  .ant-form-item-control {
    display: flex;
    cursor: pointer;
    .ant-avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      .anticon {
        font-size: 30px;
      }
    }
  }
  .image-uploader {
    .anticon-upload {
      font-size: 50px;
    }
  }

  .image-uploader .image-hover i.image-hover-icon {
    font-size: 100px;
    -webkit-transition: font-size 0.5s;
    transition: font-size 0.5s;
    color: transparent;
  }

  .image-uploader:hover .image-hover i.image-hover-icon {
    font-size: 100px;
    color: #fff;
  }

  .image-uploader div.image-hover {
    background: transparent;
    -webkit-transition: background 0.2s;
    transition: background 0.2s;
  }
  .image-uploader:hover div.image-hover {
    background: rgba(0, 0, 0, 0.5);
  }

  .image-uploader {
    position: relative;
    width: 100%;
    flex: 1;
    text-align: center;
    .default-image {
      font-size: 25px;
    }
    .image-hover {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: transparent;
    }
  }

  .image-uploader:hover {
    .image-hover {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .avatar-uploader {
    .upload-div {
      position: relative;

      img {
        width: 86px;
        height: 86px;
      }

      .preview-div {
        opacity: 0;
        display: none;
        background-color: white;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .ant-upload-list-item-actions {
          position: absolute;
          left: 50%;
          top: 50%;
          -webkit-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          z-index: 10;
          opacity: 1;
          white-space: nowrap;
          -webkit-transition: all 0.3s;
          transition: all 0.3s;

          .anticon {
            z-index: 999;
            transition: all 0.3s;
            cursor: pointer;
            font-size: 25px;
            width: 25px;
            color: hsla(0, 0%, 100%, 0.85);
            margin: 0 4px;
          }
        }
      }

      &:hover {
        .preview-div {
          opacity: 1;
          display: block;
        }
      }
    }
  }
  .ant-form-item {
    margin-bottom: 0px;
  }
  .uploaded-image {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
    min-height: 50px;
    background-color: #d1d1d155;
    padding-top: 30px;
  }
  .overlay-image {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    opacity: 0.5;
  }
  .ant-avatar {
    background: white;
  }
`;

export default UploadImageWrapper;
