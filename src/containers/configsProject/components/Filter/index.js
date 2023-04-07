// import PropTypes from 'prop-types';
import RestInputItem from 'components/RestInput/RestInputItem';

const Filter = (props) => (
  <div {...props}>
    <RestInputItem source="name" placeholder="bundles.name" />
    <RestInputItem source="support" placeholder="bundles.support" />
    <RestInputItem source="price" placeholder="bundles.price" />
    <RestInputItem source="power" placeholder="bundles.power" />
    <RestInputItem source="type" placeholder="bundles.type" />
    <RestInputItem source="cpu" placeholder="bundles.cpu" />
    <RestInputItem source="ram" placeholder="bundles.ram" />
    <RestInputItem
      source="monthlyTransfer"
      placeholder="bundles.monthlyTransfer"
    />
    <RestInputItem source="code" placeholder="bundles.code" />
  </div>
);

Filter.propTypes = {};

export default Filter;
