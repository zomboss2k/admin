import List from 'containers/rest/List';
import { useParams } from 'react-router-dom';
import InstanceCard from './InstanceCard';

const InstanceTab = (props) => {
  const { id } = useParams();
  return (
    <div className="flex-around-nowrap">
      <List
        {...props}
        noCardWrapper
        resource="instance"
        initialFilter={{ filter: { configId: id } }}
        customLayout={<InstanceCard {...props} />}
        hasSearch={false}
        hasCreate={false}
      />
    </div>
  );
};

export default InstanceTab;
