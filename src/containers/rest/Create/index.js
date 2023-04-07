import { CloseOutlined } from '@ant-design/icons';
import Text from 'components/common/Text';
import RestCreateComponent from 'components/RestLayout/Create';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { closeModal as closeModalAction } from '@redux/modal/slice';
import CRUDActions from '../../../@redux/crudActions';
import crudSelectors from '../../../@redux/crudSelectors';

const RestCreate = (props) => {
  const {
    showModal,
    header,
    defaultOptions,
    customOnSubmit,
    resource,
    customOnBack,
    customAction,
    classNameBreadCrumb,
    classNamePageTitle,
  } = props;
  const { t } = useTranslation();
  const route = useSelector((state) => state.modal.current);
  const location = useLocation();
  const record = useSelector((state) =>
    crudSelectors[props.resource].getDefaultCreateData(state, {
      ...props,
      location,
    }),
  );
  const loading = useSelector(crudSelectors[props.resource].getCreateLoading);
  const error = useSelector(crudSelectors[props.resource].getError);

  const history = useHistory();
  const dispatch = useDispatch();

  const onBack = () => {
    if (!route) {
      history.goBack();
    } else {
      dispatch(closeModalAction());
    }
  };

  const gotoShowPage = (id) => {
    history.push(`${location.pathname.replace('create', '')}/${id}/edit`);
  };

  const onSubmit = (payload) => {
    if (customOnSubmit) {
      dispatch(
        customOnSubmit({
          data: payload,
          options: {
            isBack: true,
            ...defaultOptions,
          },
        }),
      );
    } else
      dispatch(
        CRUDActions[props.resource].create({
          data: payload,
          options: {
            isBack: !customOnBack,
            ...defaultOptions,
          },
        }),
      ).then(({ payload: { data } }) => {
        customAction?.(data, payload);
        if (data.id && !(!defaultOptions || defaultOptions.isBack === false)) {
          dispatch(CRUDActions[resource].clearCurrent());
          customOnBack ? customOnBack(data) : onBack();
        }
      });
  };
  const content = (
    <RestCreateComponent
      {...props}
      gotoShowPage={gotoShowPage}
      onSubmit={onSubmit}
      onBack={onBack}
      record={record}
      loading={loading}
      error={error}
      classNameBreadCrumb={classNameBreadCrumb}
      classNamePageTitle={classNamePageTitle}
    />
  );

  return !showModal ? (
    content
  ) : (
    <>
      {header !== null && (
        <Text type="h4White" className="modalTitleContent">
          <div className="modalTitle">
            {!header || typeof header === 'string'
              ? t(header || `${resource}.createPage`)
              : header}
          </div>
          <CloseOutlined
            onClick={onBack}
            className="modalBtnBack"
            type="ic-close"
          />
        </Text>
      )}
      {content}
    </>
  );
};

RestCreate.propTypes = {
  closeModal: PropTypes.func,
  resource: PropTypes.string,
  header: PropTypes.any,
  route: PropTypes.string,
  showModal: PropTypes.bool,
  goBack: PropTypes.func,
  goShowPageWhenSuccess: PropTypes.bool,
  defaultOptions: PropTypes.object,
  customOnSubmit: PropTypes.func,
  customOnBack: PropTypes.func,
  customAction: PropTypes.func,
};

RestCreate.defaultProps = {
  goShowPageWhenSuccess: true,
  defaultOptions: {
    isBack: true,
  },
};
export default RestCreate;
