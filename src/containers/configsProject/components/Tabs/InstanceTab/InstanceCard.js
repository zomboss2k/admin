import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { PRIMARY_KEY } from '@redux/crudCreator/dataProvider';
import { getByIdProjects } from '@redux/projects/actions';
import {
  createStrategy,
  deleteStrategy,
} from '@redux/strategy/actionsStrategy';
import { Card } from 'antd';
import ModalCustom from 'components/common/ModalCustom';
import DeleteButton from 'components/RestActions/DeleteButton';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import InstanceModal from './InstanceModal';

const InstanceCard = (props) => {
  const dispatch = useDispatch();
  const { resourceData } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const data = useSelector((state) => state.configsProject.currentData);
  const projectId = data.projectId;
  useEffect(() => {
    dispatch(
      getByIdProjects({
        data: { [PRIMARY_KEY]: projectId },
      }),
    );
  }, [dispatch, projectId]);
  const project = useSelector((state) => state.projects.currentData);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const payload = {
      configId: id,
      amount: 1,
    };
    dispatch(
      createStrategy({
        data: payload,
        headers: {
          'X-APi-Key': project?.apiKey,
        },
      }),
    );
    handleCancel();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteItem = (id) => {
    const payload = {
      instanceId: id,
    };
    dispatch(
      deleteStrategy({
        data: payload,
        headers: {
          'X-APi-Key': project?.apiKey,
        },
      }),
    );
    location.reload();
  };

  return (
    <div className="d-flex space-between p-10 isScroll">
      <Card className=" mr-20">
        <div className="flex-center w-250">
          <div className="w-110 h-110 border-circle flex-center">
            <PlusOutlined
              style={{
                fontSize: '20px',
                color: '#6852D3',
              }}
              onClick={showModal}
            />
          </div>
        </div>
      </Card>

      <ModalCustom open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <InstanceModal key={''} {...props} />
      </ModalCustom>

      {resourceData.map((data) => (
        <>
          <Card key={data.id} className="mr-20 ">
            <div className="d-flex space-between w-250">
              <div className="fw-bold">
                <p>Public IP</p>
                <p>Private IP</p>
                <p>CPU</p>
                <p>Type</p>
                <p>RAM</p>
              </div>
              <div>
                <p>{data.publicIpAddress}</p>
                <p>{data.privateIpAddress}</p>
                <p>{data.name}</p>
                <p>{data.status}</p>
                <p>{data.region}</p>
              </div>
            </div>
            <DeleteButton
              record={data}
              resource="strategy"
              deleteItem={(configId, record) => deleteItem(configId, record)}
              classNameBtn="radius-50 h-20 mw-10 flex-center position-absolute"
              styleBtn={{ width: '20px' }}
              deleteIcon={<CloseOutlined style={{ fontSize: '10px' }} />}
            />
          </Card>
        </>
      ))}
    </div>
  );
};

export default InstanceCard;
