import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { checkRole } from 'utils/tools';
import { GroupWrapper } from './styles';

const ActionGroup = ({
  children,
  elementProps,
  gotoEditPage,
  handleCloneItem,
  gotoShowPage,
  deleteItem,
  pinItem,
  record,
  modelResource,
  hasCustomize,
}) => {
  const currentRole = useSelector((state) => state.auth.role);
  if (hasCustomize) {
    if (!record.isDefault) {
      return (
        <GroupWrapper {...elementProps}>
          {React.Children.map(children, (element) =>
            checkRole(element.props.roles, currentRole)
              ? React.cloneElement(element, {
                  resource: modelResource,
                  gotoEditPage: element.props.gotoEditPage || gotoEditPage,
                  handleCloneItem: element.props.handleCloneItem || handleCloneItem,
                  gotoShowPage: element.props.gotoShowPage || gotoShowPage,
                  deleteItem: element.props.deleteItem || deleteItem,
                  pinItem: element.props.pinItem || pinItem,
                  record,
                  key: element.props.source,
                })
              : null,
          )}
        </GroupWrapper>
      );
    }
    return null;
  }
  return (
    <GroupWrapper {...elementProps}>
      {React.Children.map(children, (element) =>
        checkRole(element.props.roles, currentRole)
          ? React.cloneElement(element, {
              resource: modelResource,
              gotoEditPage: element.props.gotoEditPage || gotoEditPage,
              handleCloneItem: element.props.handleCloneItem || handleCloneItem,
              gotoShowPage: element.props.gotoShowPage || gotoShowPage,
              deleteItem: element.props.deleteItem || deleteItem,
              pinItem: element.props.pinItem || pinItem,
              record,
            })
          : null,
      )}
    </GroupWrapper>
  );
};

ActionGroup.propTypes = {
  children: PropTypes.node,
  elementProps: PropTypes.object,
  record: PropTypes.object,
  gotoEditPage: PropTypes.func,
  handleCloneItem: PropTypes.func,
  gotoShowPage: PropTypes.func,
  deleteItem: PropTypes.func,
  pinItem: PropTypes.func,
  source: PropTypes.string,
  fixed: PropTypes.string,
  width: PropTypes.number,
  resource: PropTypes.string,
  icon: PropTypes.string,
  placement: PropTypes.string,
  modelResource: PropTypes.string,
  hasCustomize: PropTypes.bool,
};

ActionGroup.defaultProps = {
  source: 'actionGroup',
  fixed: 'right',
  placement: 'bottomRight',
};

export default ActionGroup;
