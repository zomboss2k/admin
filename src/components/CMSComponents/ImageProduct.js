import PropTypes from 'prop-types';
export const ImageProduct = ({ src, alt }) => {
  return <img src={src} alt={alt} />;
};

ImageProduct.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

ImageProduct.defaultProps = {
  title: 'ImageProduct',
};

ImageProduct.CMSProps = {
  title: {
    type: 'textarea',
    label: 'Main Title',
  },
  products: {
    type: 'select',
    label: 'Products',
    options: [ // Array of options
    { id: 'opt1', name: 'Option 1'},
    { id: 'opt2', name: 'Option 2'},
  ],
  },
};

export default ImageProduct;
