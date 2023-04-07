import RestShow from 'containers/rest/Show';
import RestFieldItem from 'components/RestField/RestFieldItem';

const BundlesShow = (props) => (
  <RestShow {...props} hasEdit resource="bundles">
    <RestFieldItem source="name" header="bundles.name" />
    <RestFieldItem source="support" header="bundles.support" />
    <RestFieldItem source="price" header="bundles.price" />
    <RestFieldItem source="power" header="bundles.power" />
    <RestFieldItem source="type" header="bundles.type" />
    <RestFieldItem source="cpu" header="bundles.cpu" />
    <RestFieldItem source="ram" header="bundles.ram" />
    <RestFieldItem source="monthlyTransfer" header="bundles.monthlyTransfer" />
    <RestFieldItem source="code" header="bundles.code" />
  </RestShow>
);

export default BundlesShow;
