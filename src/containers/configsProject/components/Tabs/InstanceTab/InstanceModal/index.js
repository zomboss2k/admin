import { Radio } from 'antd';
import { useSelector } from 'react-redux';

const InstanceModal = () => {
  const data = useSelector((state) => state.configsProject.currentData);
  const bundleData = useSelector((state) => state.bundles.data);
  const bundle = bundleData?.[data?.bundleId];
  return (
    <>
      <Radio.Group value={bundle.name}>
        <Radio value={bundle.name}>
          Default: {bundle.name} - CPU: {bundle.cpu} - RAM: {bundle.ram}
        </Radio>
      </Radio.Group>
    </>
  );
};

InstanceModal.propTypes = {};

export default InstanceModal;
