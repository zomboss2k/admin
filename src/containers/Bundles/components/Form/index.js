import RestInputItem from 'components/RestInput/RestInputItem';

const BundlesForm = (props) => (
  <div {...props}>
    <RestInputItem source="name" header="bundles.name" />
    <RestInputItem source="support" header="bundles.support" />
    <RestInputItem source="price" header="bundles.price" />
    <RestInputItem source="power" header="bundles.power" />
    <RestInputItem source="type" header="bundles.type" />
    <RestInputItem source="cpu" header="bundles.cpu" />
    <RestInputItem source="ram" header="bundles.ram" />
    <RestInputItem source="monthlyTransfer" header="bundles.monthlyTransfer" />
    <RestInputItem source="code" header="bundles.code" />
  </div>
);

BundlesForm.propTypes = {};

export default BundlesForm;
