import PropTypes from 'prop-types';
import { getRecordData } from 'utils/tools';
import FormUpload from '../../form/FormUpload';
import { RestInputContext } from '../RestInputContext';

const RestUpload = (props) => (
  <RestInputContext.Consumer>
    {({ record, form }) => (
      <FormUpload
        record={record}
        form={form}
        defaultValue={getRecordData(record, props.source)}
        {...props}
      />
    )}
  </RestInputContext.Consumer>
);

RestUpload.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
};

export default RestUpload;
