// import PropTypes from 'prop-types';
import RestInputItem from 'components/RestInput/RestInputItem';

const Filter = (props) => (
  <div {...props}>
    <RestInputItem source="image" placeholder="projects.image" />
    <RestInputItem source="projectName" placeholder="projects.projectName" />
    <RestInputItem source="accessKey" placeholder="projects.accessKey" />
    <RestInputItem source="region" placeholder="projects.region" />
    <RestInputItem source="secretKey" placeholder="projects.secretKey" />
    <RestInputItem source="isActive" placeholder="projects.isActive" />
    <RestInputItem source="apiKey" placeholder="projects.apiKey" />
    <RestInputItem source="userId" placeholder="projects.userId" />
    <RestInputItem
      source="configQuantity"
      placeholder="projects.configQuantity"
    />
  </div>
);

Filter.propTypes = {};

export default Filter;
