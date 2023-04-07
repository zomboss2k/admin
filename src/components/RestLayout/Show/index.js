import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import { Typography, Dropdown, Button, Menu, Space } from 'antd';
import { DownOutlined, PrinterFilled } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import CustomBreadcrumb from '../../common/Breadcrumb';
import ButtonEdit from '../../RestActions/EditButton';
import DeleteButton from '../../RestActions/DeleteButton';
import Layout from '../../common/Layout';
import PageTitle from '../../common/PageTitle';

const RestShowComponent = ({
  noCardWrapper,
  deleteItem,
  gotoEditPage,
  record,
  resource,
  children,
  hasEdit,
  hasDel,
  header,
  subTitle,
  hasPrint,
  breadCrumb,
  extraAction,
  classNameBreadCrumb,
  classNamePageTitle,
}) => {
  const { id } = useParams();

  const defaultBreadCrumb = [
    { title: `${resource}.header`, path: `/${resource}` },
    { title: `#${id}`, path: window.location.pathname },
  ];

  if (!record) return null;

  const actions = (
    <Space size={14}>
      {(hasEdit || hasDel || extraAction) && (
        <Dropdown
          menu={
            // <Menu>
            //   {extraAction && <Menu.Item>{extraAction}</Menu.Item>}
            //   {hasEdit && (
            //     <Menu.Item>
            //       <ButtonEdit
            //         resource={resource}
            //         record={record}
            //         gotoEditPage={gotoEditPage}
            //         isTextBtn
            //       />
            //     </Menu.Item>
            //   )}
            //   {hasDel && (
            //     <Menu.Item>
            //       <DeleteButton
            //         resource={resource}
            //         record={record}
            //         deleteItem={deleteItem}
            //         isTextBtn
            //       />
            //     </Menu.Item>
            //   )}
            // </Menu>

            <Menu
              items={[
                { label: extraAction, value: 'extra' },
                {
                  label: (
                    <ButtonEdit
                      resource={resource}
                      record={record}
                      gotoEditPage={gotoEditPage}
                      isTextBtn
                    />
                  ),
                  value: 'edit',
                },
                {
                  label: (
                    <DeleteButton
                      resource={resource}
                      record={record}
                      deleteItem={deleteItem}
                      isTextBtn
                    />
                  ),
                  value: 'delete',
                },
              ]}
            />
          }
        >
          <Button className="btn-gray">
            {i18next.t('button.select')}
            <DownOutlined />
          </Button>
        </Dropdown>
      )}
      {hasPrint && (
        <Button className="btn-gray" icon={<PrinterFilled />}>
          {i18next.t('button.print')}
        </Button>
      )}
    </Space>
  );

  const components = React.Children.map(children, (element) =>
    React.cloneElement(element, { key: element.props.source, record }),
  );

  const content = (
    <div
      className="d-flex space-between"
      style={{ width: '100%', height: '100%' }}
    >
      {components}
    </div>
  );

  return noCardWrapper ? (
    content
  ) : (
    <Layout bordered={false}>
      <CustomBreadcrumb
        className="d-none"
        data={breadCrumb || defaultBreadCrumb}
        classNameBreadCrumb={classNameBreadCrumb}
      />
      <PageTitle className="mb-16" extraAction={actions}>
        <p className={classNamePageTitle}>{i18next.t(header)}</p>
        {!!subTitle && (
          <>
            <br />
            <Typography.Paragraph style={{ fontSize: 16 }} type="secondary">
              ${subTitle}
            </Typography.Paragraph>
          </>
        )}
      </PageTitle>
      {content}
    </Layout>
  );
};

RestShowComponent.propTypes = {
  children: PropTypes.node,
  record: PropTypes.object,
  noCardWrapper: PropTypes.bool,
  deleteItem: PropTypes.func,
  gotoEditPage: PropTypes.func,
  resource: PropTypes.string,
  hasEdit: PropTypes.bool,
  hasDel: PropTypes.bool,
  header: PropTypes.any,
  subTitle: PropTypes.string,
};

RestShowComponent.defaultProps = {
  noCardWrapper: false,
};
export default RestShowComponent;
