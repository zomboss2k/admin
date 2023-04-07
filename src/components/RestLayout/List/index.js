import React from 'react';
import { Col, Pagination, Row, Space } from 'antd';
import ExportExcelButton from 'components/RestActions/ExportExcelButton';
import PropTypes from 'prop-types';
import set from 'lodash/set';

import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { makeBreadCrumbFromPath } from 'utils/tools';
import Box from '../../common/Box';
import CustomBreadcrumb from '../../common/Breadcrumb';
import PageTitle from '../../common/PageTitle';
import EmptyData from '../../common/EmptyData';
import CreateButton from '../../RestActions/CreateButton';
import SearchInput from '../../RestActions/SearchInput';
import RestFilterForm from '../FilterLayout';
import RestListLayout from '../ListLayout';
import RestTableLayout, { showTotal } from '../TableLayout';
import { ListWrapper } from './styles';
import { get } from 'lodash';

const RestListComponent = (props) => {
  const {
    retrieveList,
    noCardWrapper,
    resourceData,
    resource,
    hasCreate,
    showCreateWhenEmpty,
    layoutButtonCreate,
    gotoCreatePage,
    filter,
    header,
    isList,
    hasSearch,
    hasExport,
    createHeader,
    resourceFilter,
    customActions,
    placeholderSearch,
    customLayout,
    summaryRow,
    noSummaries,
    isShowPagination,
    showQuickJumper,
    loading,
    breadCrumb,
    searchKeys = ['id'],
    formatSearch,
    filterInSearch,
    permanentFilter,
    exportExcelQuery,
    excelName,
    classNamePaginationView,
  } = props;
  const { t } = useTranslation();
  const location = useLocation();
  const onTextSearch = (text) => {
    retrieveList({
      ...(formatSearch
        ? formatSearch(text)
        : {
            q: {
              $and: [
                {
                  $or: searchKeys.map((e) => ({
                    [e]: {
                      $contL: text,
                    },
                  })),
                },
                {
                  $and: [
                    ...(filterInSearch || []),
                    ...(resourceFilter?.operatorFilter || []),
                  ],
                },
              ],
            },
            ...(permanentFilter && {
              filter: permanentFilter,
            }),
          }),
    });
  };

  const onChangePagination = (page, pageSize) => {
    retrieveList({
      ...resourceFilter,
      orderBy: resourceFilter.orderBy,
      offset: (page - 1) * pageSize,
      limit: pageSize,
      filter: resourceFilter.filter,
    });
  };

  const BREADCRUMB_LIST = location ? makeBreadCrumbFromPath(location) : [];

  if (BREADCRUMB_LIST.length > 1) {
    set(
      BREADCRUMB_LIST[0],
      'title',
      typeof header === 'string'
        ? t(header)
        : header || BREADCRUMB_LIST[BREADCRUMB_LIST.length - 1]?.title,
    );
  } else {
    set(
      BREADCRUMB_LIST[0],
      'title',
      typeof header === 'string'
        ? t(header)
        : header || BREADCRUMB_LIST[BREADCRUMB_LIST.length - 1]?.title,
    );
  }

  const actions = (
    <div size={10} className="vActions">
      {hasSearch ? (
        <SearchInput
          defaultValue={
            resourceFilter &&
            get(
              resourceFilter.q || resourceFilter?.filter?.q,
              `$or.0.${searchKeys?.[0]}.$contL`,
            )
          }
          onTextSearch={onTextSearch}
          placeholder={placeholderSearch}
        />
      ) : (
        <div style={{ flex: 1 }} />
      )}
      {(customActions ||
        hasExport ||
        (hasCreate && layoutButtonCreate !== 'inline')) && (
        <Space size={10}>
          {customActions}
          {hasExport && exportExcelQuery && (
            <div className="mx-12">
              <ExportExcelButton
                resource={resource}
                excelName={excelName}
                resourceFilter={resourceFilter}
                exportExcelQuery={exportExcelQuery}
              />
            </div>
          )}
          {hasCreate && layoutButtonCreate !== 'inline' && (
            <CreateButton
              header={createHeader}
              resource={resource}
              gotoCreatePage={gotoCreatePage}
            />
          )}
        </Space>
      )}
    </div>
  );

  if (!resourceData) return null;
  const filterForm = filter ? (
    <RestFilterForm
      format={filter.props.format}
      resourceFilter={resourceFilter}
      retrieveList={retrieveList}
      {...props}
    >
      {filter}
    </RestFilterForm>
  ) : null;
  const paginationView = (
    <Pagination
      className={classNamePaginationView}
      showSizeChanger
      showQuickJumper={showQuickJumper}
      total={resourceFilter.count}
      defaultCurrent={resourceFilter.offset / resourceFilter.limit + 1 || 1}
      current={resourceFilter.offset / resourceFilter.limit + 1 || 1}
      showTotal={showTotal}
      pageSize={resourceFilter.limit || 10}
      onChange={onChangePagination}
      onShowSizeChange={onChangePagination}
    />
  );
  // const paginationTopView = (
  //   <Row
  //     className="paginationRow"
  //     justify="center"
  //     align="middle"
  //     type="flex"
  //     style={{ marginBottom: 20 }}
  //   >
  //     <Col md={actions ? 16 : 24} xs={24}>
  //       {paginationView}
  //     </Col>
  //     {actions && (
  //       <Col md={8} xs={24}>
  //         <ActionView>{actions}</ActionView>
  //       </Col>
  //     )}
  //   </Row>
  // );

  const paginationBottomView = (
    <Row
      key="paginationBottom"
      className="paginationRow"
      justify="end"
      align="middle"
      type="flex"
    >
      {isShowPagination && <Col>{paginationView}</Col>}
    </Row>
  );

  const tableContent = [
    <Box key="table" className="box">
      <RestTableLayout {...props} />
    </Box>,
    paginationBottomView,
  ];
  const listCotent = customLayout ? (
    React.cloneElement(customLayout, {
      retrieveList,
      resource,
      resourceData,
      resourceFilter,
    })
  ) : (
    <RestListLayout {...props} />
  );
  const content =
    isList || customLayout ? (
      <>
        {listCotent}
        {paginationBottomView}
      </>
    ) : (
      <Row className="viewContent">
        <Col md={0} xs={24}>
          {listCotent}
        </Col>
        <Col md={24} xs={0}>
          {tableContent}
        </Col>
      </Row>
    );

  return (
    <ListWrapper>
      <div className="viewContent">
        {!noCardWrapper && (
          <>
            {breadCrumb && <CustomBreadcrumb data={breadCrumb} />}
            <PageTitle
              extraAction={
                layoutButtonCreate === 'inline' && (
                  <CreateButton
                    header={createHeader}
                    resource={resource}
                    gotoCreatePage={gotoCreatePage}
                  />
                )
              }
              className="mb-16"
            >
              {t(header)}
            </PageTitle>
          </>
        )}
        {!noCardWrapper && !noSummaries && <div>{summaryRow}</div>}
        {filterForm}
        {actions}
        {!resourceFilter.count && !loading && showCreateWhenEmpty ? (
          <EmptyData
            isShowCreate={showCreateWhenEmpty}
            gotoCreatePage={gotoCreatePage}
            resource={resource}
          />
        ) : (
          content
        )}
      </div>
    </ListWrapper>
  );
};

RestListComponent.propTypes = {
  resource: PropTypes.string,
  noCardWrapper: PropTypes.bool,
  retrieveList: PropTypes.func,
  resourceData: PropTypes.array,
  hasCreate: PropTypes.bool,
  showCreateWhenEmpty: PropTypes.bool,
  gotoCreatePage: PropTypes.func,
  filter: PropTypes.object,
  header: PropTypes.any,
  children: PropTypes.any,
  isList: PropTypes.bool,
  hasSearch: PropTypes.bool,
  hasExport: PropTypes.bool,
  location: PropTypes.object,
  createHeader: PropTypes.string,
  resourceFilter: PropTypes.object,
  layoutButtonCreate: PropTypes.string,
  placeholderSearch: PropTypes.string,
  exportExcel: PropTypes.func,
  customActions: PropTypes.any,
  customLayout: PropTypes.any,
  summaryRow: PropTypes.node,
  noSummaries: PropTypes.bool,
  isShowPagination: PropTypes.bool,
  showQuickJumper: PropTypes.bool,
  loading: PropTypes.bool,
};

RestListComponent.defaultProps = {
  noCardWrapper: false,
  isList: false,
  hasExport: true,
  hasSearch: true,
  hasCreate: true,
  layoutButtonCreate: 'non-inline',
  isShowPagination: true,
  showQuickJumper: true,
  loading: false,
};
export default RestListComponent;
