import PropTypes from 'prop-types';
import { getRecordData } from 'utils/tools';
import FormGoogleAutocomplete from '../../form/FormGoogleAutocomplete';
import { RestInputContext } from '../RestInputContext';

const RestGoogleAutocomplete = (props) => (
  <RestInputContext.Consumer>
    {({ record, form }) => (
      <FormGoogleAutocomplete
        {...props}
        record={record}
        form={form}
        defaultValue={getRecordData(record, props.source)}
      />
    )}
  </RestInputContext.Consumer>
);

RestGoogleAutocomplete.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
};

export default RestGoogleAutocomplete;
