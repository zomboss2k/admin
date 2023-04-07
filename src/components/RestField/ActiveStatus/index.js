import PropTypes from 'prop-types';
import { getRecordData } from 'utils/tools';
import styled from 'styled-components';
import i18next from 'i18next';

const ActiveStatus = ({ record, source }) => (
  <StatusWrapper isActive={getRecordData(record, source)}>
    <div className="status-icon" />
    <div>
      {i18next.t(`status.${getRecordData(record, source) ? 'active' : 'inactive'}`)}
    </div>
  </StatusWrapper>
);

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;

  .status-icon {
    width: 6px;
    min-width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 5px;
    background: ${({ isActive }) => isActive ? 'green' : 'red'};
  }
`

ActiveStatus.propTypes = {
  record: PropTypes.object,
  source: PropTypes.string,
};

export default ActiveStatus;
