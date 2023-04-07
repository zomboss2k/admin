import {
  DeleteOutlined,
  EyeOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Upload, Modal } from 'antd';
import { getUrl, isImage, uploadMedia } from 'api/uploadMedia';
import { SVGIcon } from 'components/common/SVGIcons';
import { RestInputContext } from 'components/RestInput/RestInputContext';
import { get } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getImageUrl } from 'utils/tools';
import FormItem from '../FormItem';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default function FormUploadAvatar({
  source,
  defaultValue,
  parentSource,
  ...props
}) {
  const [imageUrl, setImageUrl] = useState(defaultValue);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { form, record } = useContext(RestInputContext);
  const { t } = useTranslation();

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined />
      ) : (
        <SVGIcon style={{ opacity: 0.5 }} name="addImage" />
      )}
      <div style={{ marginTop: 8, opacity: 0.5 }}>{t('button.upload')}</div>
    </div>
  );

  const deleteImage = (e) => {
    e.stopPropagation();
    setImageUrl('');
    form.setFieldsValue({
      ...(Array.isArray(source) && Number.isInteger(source?.[0]) && parentSource
        ? {
            [parentSource]: props.form
              .getFieldValue(parentSource)
              ?.map((e, index) => ({
                ...e,
                ...(index === source?.[0] && {
                  [source?.[1]]: '',
                }),
              })),
          }
        : {
            [source]: '',
          }),
    });
  };

  const customRequest = async ({ onSuccess, file, resource }) => {
    const responseS3 = await getUrl(file.name, file.type, resource);
    const response = await uploadMedia(responseS3.uploadUrl, file);

    if (response) {
      setImageUrl(responseS3.url);
      form.setFieldsValue({
        ...(Array.isArray(source) &&
        Number.isInteger(source?.[0]) &&
        parentSource
          ? {
              [parentSource]: props.form
                .getFieldValue(parentSource)
                ?.map((e, index) => ({
                  ...e,
                  ...(index === source?.[0] && {
                    [source?.[1]]: responseS3.url,
                  }),
                })),
            }
          : {
              [source]: responseS3.url,
            }),
      });
      onSuccess(responseS3.name, file);
    }
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, imageUrl =>
      //   this.setState({
      //     imageUrl,
      //     loading: false,
      //   }),
      // );

      form.setFieldsValue({
        ...(Array.isArray(source) &&
        Number.isInteger(source?.[0]) &&
        parentSource
          ? {
              [parentSource]: props.form
                .getFieldValue(parentSource)
                ?.map((e, index) => ({
                  ...e,
                  ...(index === source?.[0] && {
                    [source?.[1]]:
                      (info.file && info.file.response) || info.file.url,
                  }),
                })),
            }
          : {
              [source]: (info.file && info.file.response) || info.file.url,
            }),
      });
      getBase64(info.file.originFileObj, () => {
        setLoading(false);
      });
    }
  };

  const renderPreview = () =>
    isImage(imageUrl) ? (
      <img
        src={getImageUrl(imageUrl)}
        alt="avatar"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    ) : (
      <video src={imageUrl} style={{ width: '40px' }}>
        <track kind="captions" />
      </video>
    );

  useEffect(() => {
    if (!imageUrl) {
      if (
        Array.isArray(source) &&
        Number.isInteger(source?.[0]) &&
        parentSource
      ) {
        const parentData = get(record, parentSource);
        const data = parentData?.find((e, i) => i === source?.[0])?.[
          source?.[1]
        ];

        form.setFieldsValue({
          [parentSource]: form.getFieldValue(parentSource)?.map((e, index) => ({
            ...e,
            ...(index === source?.[0] && {
              [source?.[1]]: data,
            }),
          })),
        });
        setImageUrl(data);
      } else {
        if (get(record, source)) {
          form.setFieldsValue({
            [source]: get(record, source),
          });
          setImageUrl(get(record, source));
        }
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <FormAvatarWrapper>
      <Modal open={visible} footer={null} onCancel={() => setVisible(false)}>
        <img
          alt="example"
          style={{ width: '100%' }}
          src={getImageUrl(imageUrl)}
        />
      </Modal>
      <FormItem source={source} defaultValue={defaultValue} {...props} noStyle>
        <input className="d-none" />
      </FormItem>
      <FormItem {...props}>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          customRequest={customRequest}
          onChange={handleChange}
        >
          {imageUrl ? (
            <div className="img-wrapper">
              {renderPreview()}
              <div className="overlay">
                <EyeOutlined
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisible(true);
                  }}
                />
                <DeleteOutlined onClick={deleteImage} />
              </div>
            </div>
          ) : (
            uploadButton
          )}
        </Upload>
      </FormItem>
    </FormAvatarWrapper>
  );
}

const FormAvatarWrapper = styled.div`
  .img-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    .overlay {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 5px;
      bottom: 0px;
      width: 100px;
      height: 100px;
      display: flex;
      z-index: 2;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.3);
      visibility: hidden;
      &:hover {
        visibility: visible;
        & ~ .lbSetDefault {
          visibility: visible;
        }
      }
      .anticon {
        color: #fff;
        font-size: 24px;
        margin: 5px;
      }
    }

    &:hover {
      .overlay {
        visibility: visible;
      }
    }
    img:hover ~ .overlay {
      visibility: visible;
    }
  }
`;
