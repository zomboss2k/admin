import { Collapse } from 'antd';
import CheckImageResourceFail from './CheckImageResourceFail';
import CheckContentResourceFail from './CheckContentResourceFail';
import ClearCache from './ClearCache';

const { Panel } = Collapse;
export default function Development() {
  return (
    <Collapse>
      <Panel header="Clear Cache" key="0">
        <ClearCache />
      </Panel>
      <Panel header="Check Image Resource" key="1">
        <CheckImageResourceFail />
      </Panel>
      <Panel header="Check Content Resource" key="2">
        <CheckContentResourceFail />
      </Panel>
    </Collapse>
  );
}
