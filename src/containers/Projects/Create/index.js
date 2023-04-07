import Create from 'containers/rest/Create';
import Form from '../components/Form';

const ProjectsCreate = (props) => (
  <Create
    {...props}
    header="General information"
    resource="projects"
    hasBottomButton={false}
    classNameBreadCrumb={'d-none'}
    classNamePageTitle="size-14 back-color"
  >
    <Form />
  </Create>
);

ProjectsCreate.propTypes = {};

export default ProjectsCreate;
