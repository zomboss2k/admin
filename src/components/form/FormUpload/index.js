import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { getUrl, isImage, uploadMedia } from 'api/uploadMedia';
import { useState } from 'react';
import { getImageUrl } from 'utils/tools';

export default function FormUpload() {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const customRequest = async ({ onSuccess, file }) => {
    const responseS3 = await getUrl(file.name, file.type);
    const response = await uploadMedia(responseS3.uploadUrl, file);
    if (response) {
      onSuccess(
        isImage(file.name) ? responseS3.fileName : responseS3.url,
        file,
      );
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
      setImageUrl((info && info.response) || info.url);
      setLoading(false);
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

  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        customRequest={customRequest}
        onChange={handleChange}
      >
        {imageUrl ? renderPreview() : uploadButton}
      </Upload>
    </div>
  );
}
