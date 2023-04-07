import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import crudSelectors from '@redux/crudSelectors';
import { actions } from '@redux/carts/slice';
import { commaString } from 'utils/tools';
import ProductCartViewStyles from './styles';
import RateCustom from '../Rate';
import { useTranslation } from 'react-i18next';

const ConnectProductCartView = ({
  id,
  image,
  price,
  oldPrice,
  rate,
  type,
  name,
  sellOff,
}) => {
  const loading = useSelector(crudSelectors.carts.getLoadingCurrentRecord);
  const { t } = useTranslation();
  const cartItems = useSelector((state) => state.carts.data);
  const currentId = useSelector((state) => state.carts.currentId);
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(actions.addToCart({ id, image, name }));
  };

  return (
    <ProductCartViewStyles>
      <div>
        <div className="image-div">
          <Link to={`/products/${id}/edit`}>
            <img className="image-product" src={image} alt={name} />
          </Link>
        </div>
        {sellOff && (
          <div className="remark">
            <span className="label-item">{`${sellOff}% Off`}</span>
          </div>
        )}

        <div className="content-info">
          <div className="price-type">
            <span className="type-name">{type}</span>
            <div className="price-content">
              {price && (
                <span className="price">
                  {`${t('currencyUnit.sign')}${commaString(
                    String(price?.toFixed(2)),
                  )}`}
                </span>
              )}
              {oldPrice && (
                <span className="oldPrice">
                  {`${t('currencyUnit.sign')}${commaString(
                    String(oldPrice?.toFixed(2)),
                  )}`}
                </span>
              )}
            </div>
          </div>
          <div className="name-rate">
            <span className="name">{name}</span>
            <RateCustom rate={rate} />
          </div>
        </div>
      </div>

      <div className="button-bottom">
        <Button
          className="button-cart"
          type="primary"
          onClick={addToCart}
          loading={id === currentId && loading}
          disabled={!!cartItems[id]}
        >
          {cartItems[id] ? t('button.addedToCart') : t('button.addToCart')}
        </Button>
      </div>
    </ProductCartViewStyles>
  );
};

const ProductCartView = ConnectProductCartView;

ConnectProductCartView.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  rate: PropTypes.number,
  price: PropTypes.number,
  oldPrice: PropTypes.number,
  type: PropTypes.string,
  name: PropTypes.string,
  sellOff: PropTypes.number,
};

export default ProductCartView;
