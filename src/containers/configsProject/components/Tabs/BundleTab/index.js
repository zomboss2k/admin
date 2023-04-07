import Text from 'components/common/Text';
import RestFieldItem from 'components/RestField/RestFieldItem';
import { formatMoneyWithCurrency } from 'utils/textUtils';
import List from 'containers/rest/List';

const BundleTab = (props) => {
  // eslint-disable-next-line
  const SelectedAction = ({ selectedRowKeys, setSelectedRowKeys }) => {
    return (selectedRowKeys || []).join(', ');
  };
  return (
    <List
      {...props}
      resource="bundles"
      hasSearch={false}
      hasCreate={false}
      noCardWrapper
      maxSelectedKeys={1}
      SelectedAction={SelectedAction}
      classNameSelectedRow="d-none"
    >
      <RestFieldItem source="name" />
      <RestFieldItem
        source="price"
        format={(price) => formatMoneyWithCurrency(price)}
        header="bundles.price"
      />
      <RestFieldItem source="support" header="bundles.support" />
      <RestFieldItem source="cpu" header="bundles.cpu" />
      <RestFieldItem
        source="price"
        format={(price) => formatMoneyWithCurrency(price)}
        header="bundles.price"
      />
      <RestFieldItem source="power" header="bundles.power" />
      <RestFieldItem source="type" header="bundles.type" />
      <RestFieldItem source="ram" header="bundles.ram" />
      <RestFieldItem
        source="monthlyTransfer"
        header="bundles.monthlyTransfer"
      />
      <Text>Selected</Text>
    </List>
  );
};

export default BundleTab;
