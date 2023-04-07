import { DownOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  Menu,
  notification,
  Row,
  Spin,
  Space,
} from 'antd';
import PageTitle from 'components/common/PageTitle';
import DeleteButton from 'components/RestActions/DeleteButton';
import _, { isEmpty, zipObjectDeep } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { RestInputContext } from '../../RestInput/RestInputContext';
import RestInputItem from '../../RestInput/RestInputItem';
import ButtonRow from '../FooterButtonRow';
import { DesktopButtonRow } from './styles';

const EDIT_BLACKLIST = ['createdAt', 'updatedAt'];

const EditFormComponent = ({
  record,
  loading,
  onBack,
  children,
  showModal,
  customSubmitButton,
  positionOfSubmitButton,
  onSubmit,
  formatOnSubmit,
  customOnBack,
  header,
  resource,
  hasDel,
  deleteItem,
  noCardWrapper,
  extraAction,
  hideNoti,
  hasBottomButton,
  classNamePageTitle,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const getData = () =>
    new Promise((resolve) => {
      form.validateFields().then((values) => {
        const parseToObj = zipObjectDeep(Object.keys(values), _.values(values));
        const submitData = formatOnSubmit
          ? formatOnSubmit(parseToObj)
          : parseToObj;
        resolve(submitData);
        resolve({});
      });
    });

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const parseToObj = zipObjectDeep(Object.keys(values), _.values(values));
      const submitData = formatOnSubmit
        ? formatOnSubmit(parseToObj)
        : parseToObj;
      onSubmit(submitData);
    });
  };

  const onFinishFailed = (e) => {
    let alertStr = '';
    e.errorFields.forEach((err) => {
      alertStr += err.errors.join(',');
    });
    !hideNoti &&
      notification.error({
        message: 'Validate Error!',
        description: alertStr,
      });
  };

  if (isEmpty(record)) return <Spin />;

  if (!children || children.length === 0) {
    const components = Object.keys(record).map((key) =>
      EDIT_BLACKLIST.indexOf(key) > -1 ? null : (
        <RestInputItem
          type={typeof record[key]}
          disabled={key === 'id'}
          form={form}
          defaultValue={record[key]}
          name={key}
          header={key}
        >
          <Input />
        </RestInputItem>
      ),
    );

    return (
      <Form
        layout="vertical"
        onFinishFailed={onFinishFailed}
        onFinish={handleSubmit}
        form={form}
      >
        {components}
        {customSubmitButton !== undefined ? (
          customSubmitButton &&
          React.cloneElement(customSubmitButton, {
            loading,
            handleSubmit,
            onBack,
            getData,
          })
        ) : (
          <ButtonRow
            showModal={showModal}
            loading={loading}
            handleSubmit={handleSubmit}
            onBack={customOnBack || onBack}
          />
        )}
      </Form>
    );
  }
  const actions = (
    <Space size={5}>
      {!showModal && (
        <DesktopButtonRow className="desktopButtonRow">
          {customSubmitButton !== undefined ? (
            customSubmitButton &&
            React.cloneElement(customSubmitButton, {
              loading,
              handleSubmit,
              onBack,
              getData,
            })
          ) : (
            <ButtonRow
              showModal={showModal}
              loading={loading}
              handleSubmit={handleSubmit}
              onBack={customOnBack || onBack}
            />
          )}
        </DesktopButtonRow>
      )}
      {(hasDel || extraAction) && (
        <div>
          <Dropdown
            menu={
              <Menu
                items={
                  extraAction && (
                    <Menu.ItemGroup>
                      {Array.isArray(extraAction) ? (
                        extraAction?.map((e, index) => (
                          <Menu.Item key={`${index}-extra-action`}>
                            {e}
                          </Menu.Item>
                        ))
                      ) : (
                        <Menu.Item>{extraAction}</Menu.Item>
                      )}
                    </Menu.ItemGroup>
                  )
                }
              >
                {hasDel && (
                  <Menu.Item>
                    <DeleteButton
                      resource={resource}
                      record={record}
                      deleteItem={deleteItem}
                      isTextBtn
                    />
                  </Menu.Item>
                )}
              </Menu>
            }
          >
            <Button className="btn-gray">
              {t('button.select')}
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      )}
    </Space>
  );
  return (
    <>
      <div style={{ width: '100%' }}>
        <div className="drawerContainer">
          <Form
            layout="vertical"
            form={form}
            onFinishFailed={onFinishFailed}
            onFinish={handleSubmit}
            style={{ width: '100%' }}
          >
            <RestInputContext.Provider
              value={{
                form,
                record,
                getData,
                handleSubmit,
                isEdit: true,
              }}
            >
              {!(showModal || noCardWrapper) && (
                <div style={{ width: '100%' }}>
                  <PageTitle extraAction={actions}>
                    {header ? (
                      <p className={classNamePageTitle}>{t(header)}</p>
                    ) : (
                      `${t(`${resource}.header`)} #${record?.id}`
                    )}
                  </PageTitle>
                </div>
              )}
              <Row gutter={16}>
                <Col
                  className="content"
                  md={positionOfSubmitButton === 'left' ? 20 : 24}
                  xs={24}
                >
                  <div className="content-form">{children}</div>
                </Col>
                {hasBottomButton ? (
                  <Col md={positionOfSubmitButton === 'left' ? 4 : 24} xs={24}>
                    {customSubmitButton !== undefined ? (
                      customSubmitButton &&
                      React.cloneElement(customSubmitButton, {
                        loading,
                        handleSubmit,
                        onBack,
                        getData,
                      })
                    ) : (
                      <ButtonRow
                        showModal={showModal}
                        loading={loading}
                        handleSubmit={handleSubmit}
                        onBack={customOnBack || onBack}
                      />
                    )}
                  </Col>
                ) : (
                  <></>
                )}
              </Row>
            </RestInputContext.Provider>
          </Form>
        </div>
      </div>
    </>
  );
};
EditFormComponent.propTypes = {
  loading: PropTypes.bool,
  showModal: PropTypes.bool,
  onBack: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
  positionOfSubmitButton: PropTypes.string,
  customSubmitButton: PropTypes.node,
  record: PropTypes.object,
  formatOnSubmit: PropTypes.func,
  customOnBack: PropTypes.func,
};

EditFormComponent.defaultProps = {
  positionOfSubmitButton: 'bottom',
  record: {},
  hasBottomButton: true,
};

export default EditFormComponent;
