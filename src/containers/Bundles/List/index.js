import List from 'containers/rest/List';
import RestFieldItem from 'components/RestField/RestFieldItem';
import { formatMoneyWithCurrency } from 'utils/textUtils';

const BundlesList = (props) => (
  <List
    {...props}
    resource="bundles"
    hasSearch={false}
    hasCreate={false}
    noCardWrapper
  >
    <RestFieldItem source="code" header="bundles.code" />
    <RestFieldItem source="name" header="bundles.name" />
    <RestFieldItem source="support" header="bundles.support" />
    <RestFieldItem
      source="price"
      format={(price) => formatMoneyWithCurrency(price)}
      header="bundles.price"
    />
    <RestFieldItem source="power" header="bundles.power" />
    <RestFieldItem source="type" header="bundles.type" />
    <RestFieldItem source="cpu" header="bundles.cpu" />
    <RestFieldItem source="ram" header="bundles.ram" />
    <RestFieldItem source="monthlyTransfer" header="bundles.monthlyTransfer" />
  </List>
);

BundlesList.propTypes = {};

export default BundlesList;
