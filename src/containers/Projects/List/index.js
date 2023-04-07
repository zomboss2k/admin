import List from 'containers/rest/List';
import RestFieldItem, {
  formatStatus,
} from 'components/RestField/RestFieldItem';
import ActionGroup from 'components/RestActions/ActionGroup';
import EditButton from 'components/RestActions/EditButton';
import { formatDateTime } from 'utils/textUtils';
import RestImageField from 'components/RestField/ImageField';
import { Link } from 'react-router-dom';

const ProjectsList = (props) => {
  return (
    <List
      {...props}
      noCardWrapper
      hasCreate={false}
      hasSearch={false}
      resource="projects"
      header="Projects"
    >
      <RestImageField
        source="image"
        style={{ width: '70px', height: '60px' }}
      />
      <RestFieldItem
        format={(projectName, projects) => (
          <Link to={`/projects/${projects.id}/show`}>{projectName}</Link>
        )}
        isUpdateRoute={true}
        source="projectName"
        header="projects.projectName"
      />
      <RestFieldItem
        format={formatStatus}
        source="isActive"
        header="projects.isActive"
      />
      <RestFieldItem source="region" header="projects.region" />
      <RestFieldItem source="configQuantity" header="projects.configQuantity" />
      <RestFieldItem
        format={(updatedAt) => formatDateTime(updatedAt)}
        source="updatedAt"
        header="projects.updatedAt"
      />
      <ActionGroup>
        <EditButton />
      </ActionGroup>
    </List>
  );
};

ProjectsList.propTypes = {};

export default ProjectsList;
