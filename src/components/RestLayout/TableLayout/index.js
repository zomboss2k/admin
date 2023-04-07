import React, { Component } from 'react';
import { update, get } from 'lodash';
import PropTypes from 'prop-types';
import { Button, Input, notification } from 'antd';
import I18n from 'i18next';
import { getRecordData, getValidData } from 'utils/tools';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import Text from '../../common/Text';
import { DropdownStyles, TableStyles } from './styles';
import { DraggableBodyRow } from './DraggableBodyRow';
import SelectedRowKeys from './SelectedRowKeys';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import updateArray from 'immutability-helper';

class RestTableLayout extends Component {
  searchInput = {};

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      searchInput: {},
    };
  }

  onChangePagination = (e, filters, sorter) => {
    const { resourceFilter, retrieveList } = this.props;
    const formatFilter = {};
    const formatSort =
      sorter && sorter.field && sorter.order
        ? `${sorter.order === 'descend' ? '-' : ''}${sorter.field}`
        : null;

    Object.keys(filters).forEach((filter) => {
      const filterKey = filter;
      const $in = Array.isArray(filters[filter])
        ? filters[filter].filter((data) => typeof data !== 'object')
        : filters[filter];

      const searchFilter = Array.isArray(filters[filter])
        ? filters[filter].find((data) => typeof data === 'object')
        : '';

      update(formatFilter, filterKey, () => undefined);
      if ($in?.length) {
        update(formatFilter, filterKey, () => $in);
      }
      if (searchFilter) {
        update(formatFilter, filterKey, () => searchFilter);
      } else {
        $in?.length && update(formatFilter, filterKey, () => $in);
      }
    });
    retrieveList({
      offset: (e.current - 1) * e.pageSize,
      limit: e.pageSize,
      filter: getValidData({ ...resourceFilter.filter, ...formatFilter }, true),
      orderBy: formatSort,
    });
  };

  onChangeRecord = (record, item) => (value) => {
    this.props.updateRecord(
      record.id,
      {
        [item.props.source]: value,
      },
      true,
    );
  };

  handleSearch = (confirm) => {
    confirm();
  };

  handleReset = (dataIndex) => {
    const { resourceFilter, retrieveList } = this.props;
    const formatFilter = { ...resourceFilter.filter };
    update(formatFilter, dataIndex, () => undefined);
    retrieveList({
      ...resourceFilter,
      filter: { ...formatFilter },
    });
  };

  onBlur = (index, source) => (e) => {
    const { onEditHeaderSuccess } = this.props;
    onEditHeaderSuccess({ index, source, value: e.currentTarget.value });
  };

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  getColumnSearchProps = (dataIndex, header, hasSearch) => {
    const { resourceFilter } = this.props;
    const defaultValue = get(resourceFilter.filter, `${dataIndex}.like`);
    return hasSearch
      ? {
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
            const filters =
              selectedKeys?.filter?.((data) => typeof data === 'string') || [];
            return (
              <DropdownStyles style={{ padding: 8 }}>
                <Input
                  ref={(node) => {
                    this.searchInput[dataIndex] = node;
                  }}
                  placeholder={`Search ${I18n.t(header)}`}
                  onChange={(e) =>
                    setSelectedKeys(
                      e.target.value
                        ? [...filters, { like: e.target.value }]
                        : filters,
                    )
                  }
                  onPressEnter={() => this.handleSearch(confirm)}
                  style={{ width: 188, marginBottom: 8, display: 'block' }}
                  defaultValue={defaultValue}
                />
                <Button
                  type="primary"
                  onClick={() => this.handleSearch(confirm)}
                  icon=<SearchOutlined style={{ color: 'white' }} />
                  size="small"
                  className="search-button"
                  style={{ width: 90, marginRight: 8 }}
                >
                  {I18n.t('button.search')}
                </Button>
                <Button
                  onClick={() => {
                    // setSelectedKeys([...filters]);
                    this.searchInput[dataIndex].setValue('', () => {
                      this.handleReset(dataIndex, filters);
                      confirm();
                    });
                  }}
                  size="small"
                  style={{ width: 90 }}
                >
                  {I18n.t('button.reset')}
                </Button>
              </DropdownStyles>
            );
          },
          filterIcon: (filtered) => (
            <SearchOutlined
              type="search"
              className={filtered || defaultValue ? 'highlightFilter' : ''}
              // style={{ color: filtered || defaultValue ? '#1890ff' : undefined }}
            />
          ),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => this.searchInput[dataIndex].select());
            }
          },
        }
      : {};
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { resourceData, updatePosition, hasDraggable } = this.props;
    if (!hasDraggable) return;
    const dragRow = resourceData[dragIndex];
    const hoverRow = resourceData[hoverIndex];

    updatePosition?.({
      dragRow,
      hoverRow,
      firstItem: resourceData[0],
      newList: updateArray(resourceData, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      }),
    });
  };

  render() {
    const {
      resourceData,
      children,
      resource,
      // gotoEditPage,
      loading,
      // onRow,
      customQuery,
      resourceFilter,
      // isScroll,
      expandedRowRender,
      expandIcon,
      expandable,
      hasDraggable,
      SelectedAction,
      maxSelectedKeys,
      classNameSelectedRow,
    } = this.props;
    const { selectedRowKeys } = this.state;

    const rowSelection = {
      selectedRowKeys,
      onChange: (e) => {
        if (maxSelectedKeys) {
          if (e?.length <= maxSelectedKeys) {
            this.setState({ selectedRowKeys: e });
          } else {
            if (maxSelectedKeys === 1) {
              this.setState({
                selectedRowKeys: e.slice(e.length - 1, e.length),
              });
            } else {
              if (!selectedRowKeys.length)
                this.setState({ selectedRowKeys: e.slice(0, maxSelectedKeys) });
              // if (e?.length <= maxSelectedKeys + 1) {
              notification.error({
                message: I18n.t('error.title'),
                description: I18n.t('error.maxSelectedKeys', {
                  maxSelectedKeys,
                }),
              });
              // }
            }
          }
        } else {
          this.setState({ selectedRowKeys: e });
        }
      },
    };

    this.columns = children
      .filter((e) => e)
      .map((item) => ({
        fixed: item.props.fixed,
        title:
          item.props.source === 'actionGroup'
            ? null
            : // <HeaderTableWrapper
              //   onBlur={this.onBlur(index, item.props.source)}
              //   onKeyPress={this.onKeyPress}
              //   disabled={!item.props.isEditHeader}
              //   defaultValue={item.props.header ? I18n.t(item.props.header) : ''}
              // />
              I18n.t(item.props.header || ''),
        dataIndex: `${item.props.source}`,
        width: item.props.source === 'actionGroup' ? 80 : item.props.width,
        align: item.props.align,
        key: getFilterKey(item),
        sorter: item.props.sorter
          ? (a, b) =>
              getRecordData(a, item.props.source) -
              getRecordData(b, item.props.source)
          : undefined,
        defaultSortOrder: getSorterOrder(
          resourceFilter.orderBy,
          item.props.source,
        ),
        filters: item.props.filters,
        filteredValue: (() =>
          get(resourceFilter.filter || {}, getFilterKey(item)) || [])(),
        filterMultiple: item.props.filterMultiple !== false,
        // onFilter: (value, record) =>
        //   `${getRecordData(record, item.props.source)}`.search(`${value}`) > -1,
        render:
          item.props.render ||
          ((obj, record) => {
            const RecordComponent = React.cloneElement(item, {
              table: true,
              record,
              loading:
                resourceData.itemLoading && resourceData.itemLoading[record.id],
              onChangeRecord: this.onChangeRecord(record, item),
              customQuery,
              modelResource: resource,
              ...getAction(this.props, item),
            });
            return (
              <div style={item.props.width && { width: item.props.width }}>
                {RecordComponent}
              </div>
            );
          }),
        filterIcon: (filtered) => (
          <FilterOutlined
            type="filter"
            className={
              filtered ||
              get(resourceFilter.filter || {}, `${item.props.source}`)
                ? 'highlightFilter'
                : ''
            }
            // style={{ color: filtered || defaultValue ? '#1890ff' : undefined }}
          />
        ),
        filterDropdown: item.props.filterDropdown
          ? item.props.filterDropdown(
              getFilterKey(item),
              resourceFilter,
              this.handleReset,
            )
          : undefined,
        ...this.getColumnSearchProps(
          item.props.source,
          item.props.header,
          item.props.hasSearch,
        ),
      }))
      .map((e) => getValidData(e));

    const components = hasDraggable
      ? {
          body: {
            row: DraggableBodyRow,
          },
        }
      : undefined;

    return (
      <>
        {!!selectedRowKeys?.length && !!SelectedAction && (
          <SelectedRowKeys
            title={`${selectedRowKeys.length} selected`}
            classNameSelectedRow={classNameSelectedRow}
          >
            <SelectedAction
              selectedRowKeys={selectedRowKeys}
              setSelectedRowKeys={(e) => this.setState({ selectedRowKeys: e })}
            />
          </SelectedRowKeys>
        )}
        <DndProvider backend={HTML5Backend}>
          <TableStyles
            onRow={(record, index) => ({
              index,
              moveRow: this.moveRow,
            })}
            expandable={expandable}
            onChange={this.onChangePagination}
            pagination={false}
            columns={this.columns}
            loading={loading}
            expandedRowRender={expandedRowRender}
            expandIcon={expandIcon}
            dataSource={resourceData || []}
            rowKey="id"
            components={components}
            {...(!!SelectedAction && {
              rowSelection,
            })}
            // scroll={{ x: '1200px' }}
          />
        </DndProvider>
      </>
    );
  }
}

const getFilterKey = (item) =>
  item && item.props && item.props.hasSearch
    ? item.props.source
    : item.props.filterKey || `${item.props.source}`;

const getSorterOrder = (orderBy, source) => {
  if (orderBy === source) return 'ascend';
  if (orderBy === `-${source}`) return 'descend';
  return undefined;
};

export const showTotal = (total, range) => (
  <Text type="button" className="txtTotal">
    {` ${range.join(' - ')}/${total} `}
    {/* <IntlMessages id={total > 1 ? 'text.records' : 'text.record'} /> */}
  </Text>
);
export const getAction = (props, item) => {
  switch (item.props.source) {
    case 'copy':
      return {
        handleCloneItem: item.props.handleCloneItem || props.handleCloneItem,
      };
    case 'edit':
      return { gotoEditPage: item.props.gotoEditPage || props.gotoEditPage };
    case 'delete':
      return { deleteItem: item.props.deleteItem || props.deleteItem };
    case 'show':
      return { gotoShowPage: item.props.gotoShowPage || props.gotoShowPage };
    case 'actionGroup':
    default:
      return {
        gotoShowPage: props.gotoShowPage,
        deleteItem: props.deleteItem,
        gotoEditPage: props.gotoEditPage,
        handleCloneItem: props.handleCloneItem,
      };
  }
};

// const getFilteredValue = (resourceFilter, source) => {
//   const sourceFilter = getRecordData(resourceFilter, source);
//   if (!sourceFilter) return [];
//   return sourceFilter.in
//     ? [...sourceFilter.in, { searchText: sourceFilter.$link }]
//     : [{ searchText: sourceFilter.$link }];
// };

RestTableLayout.propTypes = {
  children: PropTypes.node,
  retrieveList: PropTypes.func,
  // gotoEditPage: PropTypes.func,
  resourceData: PropTypes.array,
  resourceFilter: PropTypes.object,
  loading: PropTypes.bool,
  updateRecord: PropTypes.func,
  // onRow: PropTypes.func,
  customQuery: PropTypes.func,
  onEditHeaderSuccess: PropTypes.func,
  // isScroll: PropTypes.bool,
  resource: PropTypes.string,
  expandedRowRender: PropTypes.any,
  expandIcon: PropTypes.any,
  expandable: PropTypes.any,
  updatePosition: PropTypes.func,
  hasDraggable: PropTypes.bool,
};

RestTableLayout.defaultProps = {
  onEditHeaderSuccess: () => {},
  expandedRowRender: null,
  // isScroll: true,
};

export default RestTableLayout;
