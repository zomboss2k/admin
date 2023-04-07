import Edit from 'containers/rest/Edit';
import Form from '../components/Form';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ProjectsEdit = (props) => {
  const [statusRegion, setStatusRegion] = useState();
  const configQuantity = useSelector(
    (state) => state.projects.currentData?.configs,
  );

  useEffect(() => {
    setStatusRegion(configQuantity?.length);
  }, [configQuantity?.length]);
  return (
    <Edit
      {...props}
      header="General information"
      resource="projects"
      hasBottomButton={false}
      classNameBreadCrumb={'d-none'}
      classNamePageTitle="size-14 back-color"
    >
      <Form statusRegion={statusRegion} />
    </Edit>
  );
};

ProjectsEdit.propTypes = {};

export default ProjectsEdit;
