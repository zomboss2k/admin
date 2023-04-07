// import RestAvatarInput from 'components/RestInput/RestAvatarInput';
import RestAvatarInput from 'components/RestInput/RestAvatarInput/RestAvatarInputAddition';
import RestInputItem from 'components/RestInput/RestInputItem';
import RestRadioInput from 'components/RestInput/RestRadioInput';
import RestSelect from 'components/RestInput/RestSelect';
import { STATUS } from 'configs/localData';
import RestReferenceInput from 'containers/rest/ReferenceInput';

const ProjectsForm = (props) => {
  const { statusRegion } = props;

  return (
    <>
      <div className="flex-around-nowrap" {...props}>
        <div className="w-half">
          <RestInputItem source="projectName" header="Name" />
          <RestRadioInput
            resourceData={STATUS}
            valueProp="value"
            titleProp="text"
            source="isActive"
            header="Status"
          />
          <RestInputItem source="apiKey" header="Api key" />
          <RestInputItem source="accessKey" header="Access Key" />
          <RestInputItem source="secretKey" header="Secret Key" />

          <RestReferenceInput
            resource="regions"
            source="region"
            defaultOptions={{
              customApiResource: 'resources/regions',
              primaryKey: 'code',
            }}
          >
            <RestSelect
              source="region"
              header="Region"
              valueProp="code"
              titleProp="displayName"
              disabled={statusRegion}
            />
          </RestReferenceInput>
        </div>
        <div className="position-relative">
          <RestAvatarInput source="image" header="Image" />
        </div>
      </div>
    </>
  );
};

ProjectsForm.propTypes = {};

export default ProjectsForm;
