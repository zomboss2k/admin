import PropTypes from 'prop-types';
import { GroupWrapper } from './styles';

const ActionView = (props) => (
  <GroupWrapper>
    <span style={{ flex: 1 }} />
    {props.children}
  </GroupWrapper>
);

ActionView.propTypes = {
  children: PropTypes.node,
};

ActionView.defaultProps = {};
export default ActionView;
