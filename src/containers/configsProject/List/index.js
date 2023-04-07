import List from 'containers/rest/List';
import RestFieldItem from 'components/RestField/RestFieldItem';

const ConfigsProjectList = (props) => (
  <List
    {...props}
    resource="configsProject"
    hasSearch={false}
    hasCreate={false}
    noCardWrapper
  >
    <RestFieldItem source="code" header="bundles.code" />
    <RestFieldItem source="name" header="bundles.name" />
    <RestFieldItem source="support" header="bundles.support" />
    <RestFieldItem source="price" header="bundles.price" />
    <RestFieldItem source="power" header="bundles.power" />
    <RestFieldItem source="type" header="bundles.type" />
    <RestFieldItem source="cpu" header="bundles.cpu" />
    <RestFieldItem source="ram" header="bundles.ram" />
    <RestFieldItem source="monthlyTransfer" header="bundles.monthlyTransfer" />
  </List>
);

ConfigsProjectList.propTypes = {};

export default ConfigsProjectList;
