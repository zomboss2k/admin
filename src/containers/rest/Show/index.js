import { useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import RestShowComponent from 'components/RestLayout/Show';
import { useHistory, useLocation } from 'react-router-dom';
import { getIdByUrl } from 'utils/tools';
import CRUDActions from '../../../@redux/crudActions';
import crudSelectors from '../../../@redux/crudSelectors';
import { PRIMARY_KEY } from '../../../@redux/crudCreator/dataProvider';

const RestShow = (props) => {
  const dispatch = useDispatch();
  const { showModal, resource } = props;

  const record = useSelector(crudSelectors[resource].getCurrentData);
  const location = useLocation();
  const history = useHistory();

  const id = getIdByUrl(props, location);

  const onBack = () => history.goBack();

  const deleteItem = (id) =>
    dispatch(
      CRUDActions[resource].del({
        data: { [PRIMARY_KEY]: id },
      }),
    ).then(() => {
      onBack();
    });

  const pushRoute = (data) => history.push(data);

  const gotoEditPage = (id) => {
    const { resource } = props;
    const route = `/${resource}/${id}/edit`;
    pushRoute(route);
  };

  const content = (
    <RestShowComponent
      {...props}
      record={record}
      gotoEditPage={gotoEditPage}
      deleteItem={deleteItem}
    />
  );

  useLayoutEffect(() => {
    dispatch(
      CRUDActions[resource].getDataById({
        data: {
          [PRIMARY_KEY]: id,
        },
        options: {
          isRequestApi: true,
          isRefresh: true,
          ...props.initialOptions,
        },
      }),
    );
    return () => {
      dispatch(CRUDActions[resource].clearCurrent());
    };
    // eslint-disable-next-line
  }, []);

  return !showModal ? (
    content
  ) : (
    <div>
      <Modal open onCancel={onBack} footer={null}>
        {content}
      </Modal>
    </div>
  );
};

RestShow.propTypes = {
  showModal: PropTypes.bool,
  initialOptions: PropTypes.object,
  resource: PropTypes.string,
};

export default RestShow;
