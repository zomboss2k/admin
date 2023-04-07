import RestShow from 'containers/rest/Show';
import RestFieldItem, {
  formatStatus,
} from 'components/RestField/RestFieldItem';
import List from 'containers/rest/List';
import RestImageField from 'components/RestField/ImageField';
import { Link, useHistory, useParams } from 'react-router-dom';
import ActionGroup from 'components/RestActions/ActionGroup';
import EditButton from 'components/RestActions/EditButton';
import { Button } from 'antd';
import Text from 'components/common/Text';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const ProjectsShow = (props) => {
  const { id } = useParams();
  const { t } = useTranslation();

  const project = useSelector((state) => state.projects.currentData);
  const history = useHistory();

  const gotoEditPage = (id) => {
    history.push(`/projects/${id}/edit`);
  };

  return (
    <div>
      <RestShow
        {...props}
        header="Project info"
        resource="projects"
        classNameBreadCrumb={'d-none'}
        classNamePageTitle="size-14 back-color"
      >
        <RestImageField
          source="image"
          style={{ width: '70px', height: '50px' }}
        />
        <RestFieldItem
          format={formatStatus}
          source="isActive"
          header="projects.isActive"
        />
        <RestFieldItem source="projectName" header="projects.projectName" />
        <RestFieldItem source="region" header="projects.region" />
        <RestFieldItem source="apiKey" header="projects.apiKey" />
        <ActionGroup>
          <EditButton record={project} gotoEditPage={gotoEditPage} />
        </ActionGroup>
      </RestShow>
      <div className="position-relative">
        <List
          {...props}
          noCardWrapper
          header="Config"
          hasCreate={false}
          hasSearch={false}
          initialFilter={{ filter: { projectId: id } }}
          resource="configsProject"
          classNamePaginationView={'d-none'}
        >
          <RestFieldItem source="name" header="NAME" />
          <RestFieldItem source="availabilityZone" header="AVAILABILITY ZONE" />
          <RestFieldItem source="currentInstance" header="CURRENT INSTANCE" />
          <RestFieldItem
            format={formatStatus}
            source="isActive"
            header="STATUS"
          />
          <RestFieldItem source="privatePort" header="PRIVATE PORT" />
          <ActionGroup>
            <EditButton />
          </ActionGroup>
        </List>
        <Link to="/configsProject/create">
          <Button
            type="text"
            className="position-absolute fw-medium d-flex t-38 r-5 size-12 z-index-2 bc-primary"
          >
            <Text color="#fff">{t('+ New')}</Text>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectsShow;
