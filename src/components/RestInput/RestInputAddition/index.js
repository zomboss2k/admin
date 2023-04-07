import {
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, List, Card, Form, Input, Modal, Row, Col } from 'antd';
import I18n from 'i18next';
import _, { get, values, zipObjectDeep } from 'lodash';
import PropTypes from 'prop-types';
import React, {
  Component,
  useContext,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Fragment } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getRecordData, plainToFlattenObject } from 'utils/tools';
import { RestInputContext } from '../RestInputContext';
import { InputAdditionWrapper } from './InputAdditionWrapper';
import { DraggableItem } from './DraggableItem';
import updateArray from 'immutability-helper';

const { confirm } = Modal;

const FormItem = Form.Item;

class InputAddition extends Component {
  static getDerivedStateFromProps = (nextProps, prevState) => {
    const data = getRecordData(nextProps.record, nextProps.source);
    if (data !== prevState.data) {
      return { data, formDatas: data };
    }
    return {};
  };

  constructor(props) {
    super(props);
    const { record, source } = props;
    const data = getRecordData(record, source);
    this.state = {
      // eslint-disable-next-line
      data,
      formDatas: values(data) || [{}],
      tempContents: [{}],
      visible: false,
      current: 0,
      tempCurrent: 0,
    };
    this.ref = React.createRef();
  }

  remove = (index) => {
    const { form, source, extraAction, record } = this.props;
    // const { tempContents } = this.state;
    const values = form.getFieldsValue();
    const covertData = zipObjectDeep(Object.keys(values), _.values(values));

    // can use data-binding to get
    // We need at least one passenger
    // if (formDatas.length === 1) {
    //   return;
    // }
    if (extraAction) {
      record[source][index]?.id &&
        extraAction({ id: record[source][index].id, quoteId: record.id });
    }
    const tempContents = get(covertData, source);

    if (tempContents.length === 1) {
      this.setState({ formDatas: [] });
      // can use data-binding to set
      form.setFieldsValue({
        [source]: [],
      });
    } else {
      const newData = tempContents.filter((e, i) => i !== index);
      this.setState({
        formDatas: newData,
        tempContents: newData,
      });
      // can use data-binding to set
      form.setFieldsValue({
        ...plainToFlattenObject({ [source]: [...newData] }),
        [source]: [...newData],
      });
    }
  };

  add = () => {
    // const { form, source } = this.props;
    const { formDatas } = this.state;
    // can use data-binding to get
    const tempContents = formDatas ? [...formDatas, {}] : [{}];
    this.setState({
      tempContents: tempContents,
      visible: true,
      tempCurrent: tempContents.length - 1,
    });
    // can use data-binding to set
    // important! notify form to detect changes
    // form.setFieldsValue({
    //   [source]: tempContents,
    // });
  };

  edit = (index) => {
    const { formDatas } = this.state;
    this.setState({
      current: index,
      tempCurrent: index,
      visible: true,
      tempContents: formDatas,
    });
  };

  onOk = () => {
    this.ref.current?.onOk();
  };

  onFinish = async (e) => {
    const { form } = this.props;
    try {
      const values = JSON.parse(JSON.stringify(e));
      const data = get(
        zipObjectDeep(Object.keys(values), _.values(values)),
        this.props.source,
      )?.[this.state.tempCurrent];

      this.setState({
        formDatas: this.state.tempContents.map((e, index) =>
          this.state.tempCurrent === index ? data : e,
        ),
        visible: false,
        current: this.state.tempCurrent,
      });
      form.setFieldsValue(values);
    } catch (error) {
      //
      // console.log('error', error);
    }
  };

  renderInput = (key, data, index, isTitle) => (placeholder) => {
    const { source } = this.props;
    const { formDatas } = this.state;

    const ComponentInput = isTitle ? Input : Input.TextArea;
    return (
      <div className="inputRow">
        <div>{key === 'vi' ? `${index}. ` : null}</div>
        <FormItem
          required={false}
          key={index}
          className="input"
          name={`${source}.${index}.${key}`}
          prefixSource={`${source}.${index}`}
          validateTrigger={['onChange', 'onBlur']}
          rules={[
            {
              whitespace: true,
            },
          ]}
          initialValue={getRecordData(data, key)}
        >
          <ComponentInput
            autosize={{ minRows: 2, maxRows: 3 }}
            placeholder={placeholder}
          />
        </FormItem>
        <div style={{ width: 20 }}>
          {formDatas.length > 1 && key === 'name.en' ? (
            <MinusCircleOutlined
              disabled={formDatas.length === 1}
              onClick={() => this.remove(index)}
            />
          ) : null}
        </div>
      </div>
    );
  };

  handleRemove = (index) => {
    const { hasConfirm, record, source } = this.props;
    if (hasConfirm && record[source][index]?.id) {
      confirm({
        title: `${I18n.t('popup.alertDelete')}`,
        content: I18n.t('popup.alertDeleteDes', {
          customMessage: `${record[source][index]?.id}`,
        }),
        okText: I18n.t('button.ok'),
        cancelText: I18n.t('button.cancel'),
        onOk: () => this.remove(index),
        onCancel: () => {},
      });
    } else {
      this.remove(index);
    }
  };

  moveRow = (dragIndex, hoverIndex) => {
    const { source, form, hasDraggable } = this.props;
    const values = form.getFieldsValue();
    const covertData = zipObjectDeep(Object.keys(values), _.values(values));
    if (!hasDraggable) return;
    const dragRow = get(covertData, source)?.[dragIndex];
    // const hoverRow = get(covertData, source)[hoverIndex];

    const newData = updateArray(get(covertData, source), {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow],
      ],
    });
    this.setState({
      formDatas: newData,
      tempContents: newData,
    });

    form.setFieldsValue({
      ...plainToFlattenObject({ [source]: [...newData] }),
      [source]: [...newData],
    });
  };

  render() {
    const { formDatas, tempCurrent, visible } = this.state;
    const {
      form,
      showAddBtn,
      showEditBtn,
      renderItem,
      source,
      wrapperStyle,
      children,
      record,
      header,
      showHeader,
      modalWidth,
      hasDraggable,
    } = this.props;

    const ItemWrapper = hasDraggable ? DraggableItem : Fragment;

    const extraAction = (index) => (
      <DeleteOutlined onClick={() => this.handleRemove(index)} />
    );
    const formItems = formDatas ? (
      formDatas.map((k, index) => (
        <Card
          title={`${I18n.t(header)} (${index + 1})`}
          key={String(index)}
          // extra={formDatas.length === 1 ? null : extraAction(index)}
          extra={extraAction(index)}
        >
          <div style={wrapperStyle}>
            {React.Children.map(
              children,
              (node) =>
                node &&
                React.cloneElement(node, {
                  form,
                  record,
                  key: `${source}[${String(index)}].${node.props.source}`,
                  source: `${source}.${index}.${node.props.source}`,
                  prefixSource: `${source}.${index}`,
                }),
            )}
          </div>
        </Card>
      ))
    ) : (
      <span />
    );

    return (
      <DndProvider backend={HTML5Backend}>
        <InputAdditionWrapper>
          {showHeader && (
            <div className="ant-form-item-label">
              <label>{I18n.t(header)}</label>
            </div>
          )}
          <div className="d-none">{formItems}</div>
          <List
            dataSource={formDatas || []}
            renderItem={(item, index) => (
              <ItemWrapper
                moveRow={this.moveRow}
                index={index}
                style={{
                  width: '100%',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                <List.Item
                  actions={
                    showEditBtn
                      ? [
                          <Button
                            disabled={formDatas.length === 1}
                            onClick={() => this.remove(index)}
                            key="remove"
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                          ></Button>,
                          <Button
                            onClick={() => this.edit(index)}
                            key="remove"
                            type="text"
                            icon={<EditOutlined />}
                          ></Button>,
                        ]
                      : []
                  }
                >
                  {renderItem?.(item)}
                </List.Item>
              </ItemWrapper>
            )}
          />
          {showAddBtn && (
            <Button className="btnAdd" type="text" onClick={this.add}>
              <PlusCircleOutlined />
              {`${I18n.t('button.add')} `}
              {I18n.t(header)}
            </Button>
          )}
        </InputAdditionWrapper>
        <FormModal
          open={visible}
          onCancel={() => this.setState({ visible: false })}
          onOk={this.onOk}
          width={modalWidth}
          ref={this.ref}
          onFinish={this.onFinish}
          initialValues={form.getFieldsValue()}
          wrapperStyle={wrapperStyle}
          form={form}
          source={source}
          record={{
            [source]: formDatas,
          }}
          tempCurrent={tempCurrent}
        >
          {children}
        </FormModal>
      </DndProvider>
    );
  }
}

// eslint-disable-next-line
const FormModal = forwardRef(
  (
    {
      tempCurrent,
      source,
      record,
      form,
      children,
      wrapperStyle,
      initialValues,
      onFinish,
      ...props
    },
    ref,
  ) => {
    return (
      <Modal {...props} destroyOnClose>
        <FormContent
          onFinish={onFinish}
          ref={ref}
          initialValues={initialValues}
        >
          <Row gutter={20} style={wrapperStyle}>
            {React.Children.map(
              children,
              (node) =>
                node &&
                (node.props.shouldUpdateField ? (
                  <Col {...(node.props.colSpan || { span: 24 })}>
                    <Form.Item
                      noStyle
                      shouldUpdate={(p, c) =>
                        get(
                          p,
                          `${source}.${tempCurrent}.${node.props.shouldUpdateField}`,
                        ) !==
                        get(
                          c,
                          `${source}.${tempCurrent}.${node.props.shouldUpdateField}`,
                        )
                      }
                    >
                      {({ getFieldValue }) => {
                        const value = getFieldValue(
                          `${source}.${tempCurrent}.${node.props.shouldUpdateField}`,
                        );
                        if (value === node.props.compareValue) {
                          return React.cloneElement(node, {
                            form,
                            record,
                            key: `${source}[${String(tempCurrent)}].${
                              node.props.source
                            }`,
                            source: `${source}.${tempCurrent}.${node.props.source}`,
                            prefixSource: `${source}.${tempCurrent}`,
                          });
                        }
                        return <div />;
                      }}
                    </Form.Item>
                  </Col>
                ) : (
                  <Col {...(node.props.colSpan || { span: 24 })}>
                    {React.cloneElement(node, {
                      form,
                      record,
                      key: `${source}[${String(tempCurrent)}].${
                        node.props.source
                      }`,
                      prefixSource: `${source}.${tempCurrent}`,
                      source: `${source}.${tempCurrent}.${node.props.source}`,
                    })}
                  </Col>
                )),
            )}
          </Row>
        </FormContent>
      </Modal>
    );
  },
);

InputAddition.propTypes = {
  form: PropTypes.object,
  record: PropTypes.object,
  source: PropTypes.string,
  children: PropTypes.any,
  header: PropTypes.any,
  extraAction: PropTypes.func,
  hasConfirm: PropTypes.bool,
  wrapperStyle: PropTypes.object,
  showAddBtn: PropTypes.bool,
  showEditBtn: PropTypes.bool,
  showHeader: PropTypes.bool,
};

// eslint-disable-next-line
const FormContent = React.forwardRef((props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(
    ref,
    () => ({
      onOk: () => form.submit(),
    }),
    [form],
  );

  return (
    <RestInputContext.Provider
      value={{
        form,
        record: zipObjectDeep(
          Object.keys(props.initialValues),
          _.values(props.initialValues),
        ),
      }}
    >
      <Form layout="vertical" form={form} {...props} />
    </RestInputContext.Provider>
  );
});

InputAddition.defaultProps = {
  showAddBtn: true,
  showEditBtn: true,
};

const RestInputAddition = React.forwardRef((props, ref) => {
  const { record, form } = useContext(RestInputContext);
  return <InputAddition {...props} {...{ record, form }} ref={ref} />;
});

export default RestInputAddition;
