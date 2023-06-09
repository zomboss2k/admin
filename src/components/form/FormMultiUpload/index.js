import { Modal, Upload } from 'antd';
import { UploadIcon } from 'components/common/SVGIcons';
import i18next from 'i18next';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { getImageUrl, getRecordData } from 'utils/tools';
import { getUrl, isImage, uploadMedia } from '../../../api/uploadMedia';
// import UploadImage from '../../../assets/images/upload.png';
import FormItem from '../FormItem';

export const RestUpload = ({
  defaultSourceKey,
  listType,
  customUploadButton,
  header,
  ...props
}) => {
  const [defaultImage, setDefaultImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (!isEmpty(props.record) && isEmpty(fileList)) {
      setFileList(makeFileList(props.record[props.source]));
    }
    // eslint-disable-next-line
  }, [props.record]);
  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = (file) => {
    setPreviewVisible(true);
    setPreviewImage(file.url || file.thumbUrl);
  };

  const onSetDefault = useCallback(
    (item) => {
      defaultSourceKey && setDefaultImage(item.response || item.url);
      defaultSourceKey &&
        props.form &&
        props.form.setFieldsValue({
          [defaultSourceKey]: item.response || item.url,
        });
    },
    [defaultSourceKey, props.form],
  );

  const handleChange = (e) => setFileList(e.fileList);
  const uploadButton =
    fileList && fileList.length >= 0 ? (
      <div className="uploadArea">
        <div className="overlay-image" />
        {props.placeholder && (
          <div className="header">{i18next.t(props.placeholder)}</div>
        )}
        <div className="image-uploader">
          <UploadIcon />
          <div style={{ color: '#626262', fontWeight: '600', fontSize: 12 }}>
            {i18next.t('button.uploadImage')}
          </div>
        </div>
      </div>
    ) : null;

  useEffect(
    () => {
      setFileList(
        props.defaultValue || getRecordData(props.record, props.source)
          ? makeFileList(
              props.defaultValue || getRecordData(props.record, props.source),
            )
          : [],
      );
      defaultSourceKey &&
        onSetDefault({ url: getRecordData(props.record, defaultSourceKey) });
      setPreviewImage(
        makeFileList(
          props.defaultValue || getRecordData(props.record, props.source),
        ),
      );
    },
    // eslint-disable-next-line
    [
      // defaultSourceKey,
      // onSetDefault,
      // props.defaultValue,
      // props.record,
      // props.record.id,
      // props.source,
    ],
  );

  const customRequest = async ({ onSuccess, file }) => {
    const responseS3 = await getUrl(file.name, file.type);
    const response = await uploadMedia(responseS3.uploadUrl, file);

    if (response) {
      onSuccess(isImage(file.name) ? responseS3.name : responseS3.url, file);
    }
  };

  const onChangeUpload = (e) => {
    if (fileList.length === 0) {
      onSetDefault(e.fileList[0]);
    }
    handleChange({ fileList: e.fileList });
    const formattedData = e.fileList.map(
      (data) => (data && data.response) || data.url,
    );
    setPreviewImage(formattedData);
    props.onChange && props.onChange(formattedData);
    props.form &&
      props.form.setFieldsValue({
        [props.source]: formattedData,
      });
    if (defaultSourceKey && formattedData.indexOf(defaultImage) === -1) {
      onSetDefault(e.fileList[0]);
    }
  };

  return (
    <>
      {header && (
        <div className="ant-form-item-label">
          <label>{i18next.t(header)}</label>
        </div>
      )}
      {props.form && defaultSourceKey && (
        <FormItem
          {...props}
          required={false}
          source={defaultSourceKey}
          defaultValue={
            props.defaultValue || getRecordData(props.record, defaultSourceKey)
          }
          style={{ display: 'none' }}
        >
          <input style={{ display: 'none' }} />
        </FormItem>
      )}
      <>
        {props.form && (
          <FormItem
            {...props}
            required={false}
            ruleType="array"
            defaultValue={
              props.defaultValue || getRecordData(props.record, props.source)
            }
            style={{ display: 'none' }}
          >
            <input style={{ display: 'none' }} />
          </FormItem>
        )}
        <Upload
          customRequest={customRequest}
          // action={`${process.env.REACT_APP_UPLOAD_PHOTO_URL}`}
          // headers={{
          //   'x-requested-with': undefined,
          //   Authorization: `Client-ID ${process.env.REACT_APP_UPLOAD_PHOTO_KEY}`,
          // }}
          accept="image/*"
          multiple={props.multiple}
          listType={listType || 'picture-card'}
          fileList={fileList.map((e) => ({
            ...e,
            url: getImageUrl(e?.response || e.url),
          }))}
          // showUploadList={false}
          onPreview={handlePreview}
          onChange={onChangeUpload}
        >
          {/* {fileList.map((img, index) => (
            <UploadImageItem
              key={String(index)}
              defaultSourceKey={defaultSourceKey}
              onSetDefault={onSetDefault}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              deleteImage={deleteImage}
              onPreviewUI={handlePreview}
              item={img}
              alt="upload.png"
              isDefault={
                defaultImage &&
                (defaultImage === img.url || img.response === defaultImage)
              }
            />
          ))} */}
          {customUploadButton || uploadButton}
          {/* <div className="overlayImage">
            <img src={UploadImage} alt="upload.png" />
          </div> */}
        </Upload>
        <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
          <img
            alt="example"
            style={{ width: '100%' }}
            src={getImageUrl(previewImage)}
          />
        </Modal>
      </>
    </>
  );
};

const makeFileList = (values) =>
  Array.isArray(values)
    ? values.map((value) =>
        value && value.url
          ? value
          : {
              uid: value,
              name: value,
              status: 'done',
              url: value,
            },
      )
    : [];

RestUpload.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  defaultValue: PropTypes.any,
  multiple: PropTypes.bool,
  form: PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultSourceKey: PropTypes.string,
};

RestUpload.defaultProps = {
  multiple: true,
};

export default RestUpload;
