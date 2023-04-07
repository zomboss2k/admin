import { UploadIcon } from 'components/common/SVGIcons';
import { Modal, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import i18next from 'i18next';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { getImageUrl, getRecordData, plainToFlattenObject } from 'utils/tools';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import updateArray from 'immutability-helper';
// import UploadImage from '../../../assets/images/upload.png';
import { DraggableItem } from './DraggableItem';
import FormItem from '../FormItem';
import { FormMultiUploadWrapper } from './styles';
import UploadImageItem from './UploadImageItem';
import { getUrl, isImage, uploadMedia } from 'api/uploadMedia';
import { useSelector } from 'react-redux';

const getType = (str = '') => {
  if (!str) return 'image';
  const strs = str?.split?.('/');
  if (str.includes('gif')) return 'gif';
  if (strs[0] === 'image') return 'image';
  if (strs[0] === 'video') return 'video';
};

const getImageName = (img) => {
  return img.response || img.url;
};

export const FormMultiUploadForMedias = ({
  defaultSourceKey,
  resource,
  ...props
}) => {
  const [disabled, setDisabled] = useState(false);
  const [defaultImage, setDefaultImage] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const isOpenEditor = useSelector((state) => state.cmsController.isOpenEditor);

  const { t } = useTranslation();
  useEffect(() => {
    if (!isEmpty(props.record) && isEmpty(fileList)) {
      setFileList(
        makeFileList(orderBy(props.record[props.source], 'priority')),
      );
      defaultSourceKey &&
        onSetDefault({ url: getRecordData(props.record, defaultSourceKey) });
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

  const deleteImage = (item) => {
    const results = fileList.filter((file) => file.url !== item.url);

    setFileList(results);
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/deleteFile`, {
      method: 'DELETE',
      body: JSON.stringify({ key: item.response || item.url }),
    });
    results.length === 0 && setDisabled(false);

    const formattedData = results.map((e) => ({
      url: e.url || e.response,
      resource,
      type: getType(e?.type),
      id: e.id,
    }));

    props.form &&
      props.form.setFieldsValue({
        ...plainToFlattenObject({
          [props.source]: formattedData,
        }),
        [props.source]: formattedData,
      });
  };

  const onMouseEnter = () => {
    setDisabled(true);
  };

  const onMouseLeave = () => {
    setDisabled(false);
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
  const uploadButton = (
    <div className="uploadArea">
      <div className="overlay-image" />
      {props.placeholder && (
        <div className="header">{t(props.placeholder)}</div>
      )}
      <div className="image-uploader">
        <UploadIcon />
        <div style={{ color: '#626262', fontWeight: '600', fontSize: 12 }}>
          {i18next.t('button.uploadImage')}
        </div>
      </div>
    </div>
  );

  // useEffect(
  //   () => {
  //     setFileList(
  //       props.defaultValue || getRecordData(props.record, props.source)
  //         ? makeFileList(
  //             props.defaultValue || getRecordData(props.record, props.source),
  //           )
  //         : [],
  //     );
  //     defaultSourceKey &&
  //       onSetDefault({ url: getRecordData(props.record, defaultSourceKey) });
  //     setPreviewImage(
  //       makeFileList(
  //         props.defaultValue || getRecordData(props.record, props.source),
  //       ),
  //     );
  //   },
  //   // eslint-disable-next-line
  //   [
  //     // defaultSourceKey,
  //     // onSetDefault,
  //     // props.defaultValue,
  //     // props.record,
  //     // props.record.id,
  //     // props.source,
  //   ],
  // );

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
    const formattedData = e.fileList.map((data) => ({
      url: (data && data.response) || data.url,
      type: e.type,
      resource,
      priority: data?.priority ?? e.fileList?.length - 1,
      id: data.id,
    }));
    setPreviewImage(formattedData);
    props.onChange && props.onChange(formattedData);
    props.form &&
      props.form.setFieldsValue({
        ...plainToFlattenObject({
          [props.source]: formattedData,
        }),
        [props.source]: formattedData,
      });
    if (defaultSourceKey && formattedData.indexOf(defaultImage) === -1) {
      onSetDefault(e.fileList[0]);
    }
  };

  const moveRow = (dragIndex, hoverIndex) => {
    const { source, form } = props;
    // const covertData = zipObjectDeep(Object.keys(values), lodashValues(values));
    // console.log('asdasd covertData', covertData)
    const dragRow = fileList?.[dragIndex];
    // const hoverRow = get(covertData, source)[hoverIndex];

    const newData = updateArray(fileList, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow],
      ],
    });
    setFileList(newData);

    const formattedData = newData.map((e) => ({
      url: e.url || e.response,
      resource,
      type: getType(e?.type),
      id: e.id,
    }));

    form.setFieldsValue({
      ...plainToFlattenObject({
        [source]: [...formattedData],
      }),
      [source]: [...formattedData],
    });
  };

  return (
    <>
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
      <FormMultiUploadWrapper>
        {/* {props.form && (
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
        )} */}
        {isOpenEditor ? (
          fileList.map((img, index) => (
            <div key={`upload-item-${String(index)}`}>
              <UploadImageItem
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
              <FormItem
                {...props}
                required={false}
                source={`${props.source}.${index}.id`}
                defaultValue={img.id}
                style={{ display: 'none' }}
              >
                <input style={{ display: 'none' }} />
              </FormItem>
              <FormItem
                {...props}
                required={false}
                source={`${props.source}.${index}.url`}
                defaultValue={getImageName(img)}
                style={{ display: 'none' }}
              >
                <input style={{ display: 'none' }} />
              </FormItem>
              <FormItem
                {...props}
                required={false}
                source={`${props.source}.${index}.type`}
                defaultValue={getType(img.type)}
                style={{ display: 'none' }}
              >
                <input style={{ display: 'none' }} />
              </FormItem>
            </div>
          ))
        ) : (
          <DndProvider backend={HTML5Backend}>
            {fileList.map((img, index) => (
              <div key={`upload-item-${String(index)}`}>
                <DraggableItem moveRow={moveRow} index={index}>
                  <UploadImageItem
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
                      (defaultImage === img.url ||
                        img.response === defaultImage)
                    }
                  />
                </DraggableItem>
                <FormItem
                  {...props}
                  required={false}
                  source={`${props.source}.${index}.id`}
                  defaultValue={img.id}
                  style={{ display: 'none' }}
                >
                  <input style={{ display: 'none' }} />
                </FormItem>
                <FormItem
                  {...props}
                  required={false}
                  source={`${props.source}.${index}.url`}
                  defaultValue={getImageName(img)}
                  style={{ display: 'none' }}
                >
                  <input style={{ display: 'none' }} />
                </FormItem>
                <FormItem
                  {...props}
                  required={false}
                  source={`${props.source}.${index}.type`}
                  defaultValue={getType(img.type)}
                  style={{ display: 'none' }}
                >
                  <input style={{ display: 'none' }} />
                </FormItem>
              </div>
            ))}
          </DndProvider>
        )}
        <div>
          <Upload
            customRequest={customRequest}
            // action={`${process.env.REACT_APP_UPLOAD_PHOTO_URL}`}
            // headers={{
            //   'x-requested-with': undefined,
            //   Authorization: `Client-ID ${process.env.REACT_APP_UPLOAD_PHOTO_KEY}`,
            // }}
            accept="image/*"
            multiple={props.multiple}
            disabled={props.disabled || disabled}
            listType="picture-card"
            fileList={fileList.map((e) => ({
              ...e,
              url: e?.response || e.url,
            }))}
            showUploadList={false}
            onPreview={handlePreview}
            onChange={onChangeUpload}
          >
            {uploadButton}
            {/* <div className="overlayImage">
              <img src={UploadImage} alt="upload.png" />
            </div> */}
          </Upload>
        </div>
        <Modal open={previewVisible} footer={null} onCancel={handleCancel}>
          <img
            alt="example"
            style={{ width: '100%' }}
            src={getImageUrl(previewImage)}
          />
        </Modal>
      </FormMultiUploadWrapper>
    </>
  );
};

const makeFileList = (values) =>
  Array.isArray(values)
    ? values.map((value) =>
        value && value.url
          ? { ...value, status: value?.status || 'done' }
          : {
              uid: value,
              name: value,
              status: 'done',
              url: value,
              percent: 100,
            },
      )
    : [];

FormMultiUploadForMedias.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  defaultValue: PropTypes.any,
  multiple: PropTypes.bool,
  form: PropTypes.object,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  defaultSourceKey: PropTypes.string,
  resource: PropTypes.string,
};

FormMultiUploadForMedias.defaultProps = {
  multiple: true,
};

export default FormMultiUploadForMedias;
