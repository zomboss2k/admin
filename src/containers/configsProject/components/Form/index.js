import { PRIMARY_KEY } from '@redux/crudCreator/dataProvider';
import { getByIdProjects } from '@redux/projects/actions';
import { showAvailabilityZone } from '@redux/regions/actions';
import { Input, Tabs } from 'antd';
import { RestInputContext } from 'components/RestInput/RestInputContext';
import RestInputItem from 'components/RestInput/RestInputItem';
import RestRadioInput from 'components/RestInput/RestRadioInput';
import RestSelect from 'components/RestInput/RestSelect';
import { STATUS } from 'configs/localData';
import BundleTab from 'containers/configsProject/components/Tabs/BundleTab';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InstanceTab from '../Tabs/InstanceTab';

const ConfigsProjectForm = () => {
  const dispatch = useDispatch();
  const { record } = useContext(RestInputContext);
  const projectId = record.projectId;

  const project = useSelector((state) => state.projects.currentData);
  const availabilityZone = useSelector(
    (state) => state.regions.availabilityZone?.results,
  );

  useEffect(() => {
    dispatch(
      getByIdProjects({
        data: { [PRIMARY_KEY]: projectId },
      }),
    );
  }, [dispatch, projectId]);

  useEffect(() => {
    if (project?.region) {
      const code = project?.region;
      const apiKey = project?.apiKey;
      dispatch(
        showAvailabilityZone({
          code: code,
          headers: {
            'X-API-KEY': apiKey,
          },
        }),
      );
    }
  }, [project?.region, project?.apiKey, dispatch]);

  const [items, setItems] = useState([
    {
      key: '2',
      label: `Bundle`,
      children: <BundleTab />,
    },
  ]);
  const dataMinInstant = record.minInstant;

  useEffect(() => {
    if (dataMinInstant > 0) {
      setItems((prevItems) => [
        {
          key: '1',
          label: `Instance`,
          children: <InstanceTab />,
        },
        ...prevItems,
      ]);
    }
  }, [dataMinInstant, setItems]);

  return (
    <>
      <div className="flex-around-nowrap">
        <div>
          <RestInputItem source="name" header="Name" />
          <RestInputItem source="privatePort" header="Private port" />
          <RestInputItem source="minInstant" header="Min instance" />
          <RestSelect
            source="availabilityZone"
            resourceData={availabilityZone}
            valueProp="zoneName"
            titleProp="zoneName"
            header="Availability Zone"
          />
          <RestInputItem source="sshKey" header="SSH key" />
        </div>
        <div>
          <RestRadioInput
            resourceData={STATUS}
            valueProp="value"
            titleProp="text"
            source="isActive"
            header="Status"
          />
          <RestInputItem
            ContentComponent={Input.TextArea}
            source="gitKey"
            header="Git key"
            rows={4}
          />
          <RestInputItem
            ContentComponent={Input.TextArea}
            source="gitBranch"
            header="Git branch"
            rows={4}
          />
        </div>
        <div>
          <RestInputItem
            source="envFile"
            rows={11}
            ContentComponent={Input.TextArea}
            header="Env. file"
          />
          <RestInputItem source="gitUrl" header="Git URL" />
        </div>
      </div>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

ConfigsProjectForm.propTypes = {};

export default ConfigsProjectForm;
