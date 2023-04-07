import PropTypes from 'prop-types';
import AntImage from 'antd/lib/image';
import { getImageUrl } from 'utils/tools';

const Image = ({ preview, style, ...props }) =>
  preview ? (
    <AntImage
      alt=""
      preview={preview}
      style={{ objectFit: 'contain', ...style }}
      {...props}
      src={getImageUrl(props.src)}
    />
  ) : (
    <img
      alt=""
      {...props}
      layout="responsive"
      src={getImageUrl(props.src)}
    />
  );
  Image.propTypes = {
  src: PropTypes.string,
  preview: PropTypes.bool,
};

Image.defaultProps = {
  preview: false,
};

export default Image;
