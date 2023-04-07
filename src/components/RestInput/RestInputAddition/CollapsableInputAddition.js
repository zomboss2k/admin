import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18next';
import { get } from 'lodash';
import { Form, Button, Row, Col, Collapse } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { RestInputContext } from '../RestInputContext';

const { Panel } = Collapse;

const InputAddition = ({
  children,
  defaultValue,
  disabled,
  form,
  format,
  header,
  record,
  source,
  showLabel,
  renderItem = (item) => item?.name,
  compare,
  parentSource,
  getItem,
}) => {
  return (
    <Wrapper>
      {showLabel && (
        <div className="ant-form-item-label">
          <label>{I18n.t(header)}</label>
        </div>
      )}
      <Form.List
        name={source}
        initialValue={format(get(record, source)) || format(defaultValue)}
        disabled={disabled}
      >
        {(fields, { add, remove }) => {
          return (
            <Collapse
              className="input-addition-card"
              expandIconPosition="right"
            >
              {fields.map((field, index) => (
                <Panel
                  header={
                    compare ? (
                      <Form.Item
                        noStyle
                        shouldUpdate={(p, c) => compare(p, c, field.name, source, parentSource)}
                        key={field.fieldKey}
                      >
                        {({ getFieldValue }) => {
                          const item = getItem ? getItem({
                            getFieldValue,
                            fieldName: field.name,
                            source,
                            parentSource,
                          }) : get(
                            getFieldValue(`${source}`),
                            field.name,
                          );
                          
                          return (
                            <span>
                              {renderItem(item) ||
                                `${I18n.t(header)} ${index + 1}`}
                            </span>
                          );
                        }}
                      </Form.Item>
                    ) : (
                      `${I18n.t(header)} ${index + 1}`
                    )
                  }
                  key={String(index)}
                  extra={
                    <Button
                      className="btn-add btn-remove"
                      type="link"
                      danger
                      disabled={disabled}
                      onClick={() => {
                        remove(index);
                      }}
                      icon={<DeleteOutlined />}
                    />
                  }
                >
                  <Row gutter={14}>
                    {React.Children.map(children, (node) => (
                      <Col {...node.props.colLayout}>
                        {React.cloneElement(node, {
                          form,
                          record,
                          disabled,
                          key: `${source}.${field.fieldKey}.${node.props.source}`,
                          fieldNameProp: field.name,
                          fieldKeyProp: field.fieldKey,
                          parentSource: source,
                          source: [
                            field.name,
                            ...(Array.isArray(node.props.source)
                              ? node.props.source
                              : [node.props.source]),
                          ],
                          fieldKey: [
                            field.fieldKey,
                            ...(Array.isArray(node.props.source)
                              ? node.props.source
                              : [node.props.source]),
                          ],
                        })}
                      </Col>
                    ))}
                  </Row>
                </Panel>
              ))}
              <Button
                className="btnAdd w-100"
                type="text"
                onClick={() => {
                  add();
                }}
              >
                <PlusCircleOutlined />
                {`${I18n.t('button.add')} `}
                {I18n.t(header)}
              </Button>
            </Collapse>
          );
        }}
      </Form.List>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: 24px;
  
  .btnAdd {
    ${'' /* margin-top: 20px; */}
    border-radius: 0;
    border: 1px solid #f0f0f0;
    width: 100%;
    text-align: left;
    padding: 12px 20px;
    height: auto;
  }

  .ant-collapse {
    background: #fff;
    border-radius: 0;
    border-color: #f0f0f0;
  }

  .btnAdd > .anticon + span {
    margin-left: 8px;
  }

  .ant-collapse-content-box {
    background: #f7f7f7;
    .ant-collapse-content-box {
      background: #f0f0f0 !important;
    }
  }
`;

InputAddition.propTypes = {
  addBtnText: PropTypes.string,
  children: PropTypes.any,
  defaultValue: PropTypes.func,
  disabled: PropTypes.bool,
  extraAction: PropTypes.func,
  form: PropTypes.object,
  format: PropTypes.func,
  hasConfirm: PropTypes.bool,
  header: PropTypes.any,
  isShowAddBtn: PropTypes.bool,
  hasDivider: PropTypes.bool,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  record: PropTypes.object,
  renderEmptyState: PropTypes.func,
  source: PropTypes.string,
  addButtonType: PropTypes.string,
  Tracker: PropTypes.node,
  trackerProps: PropTypes.object,
  isShowDeleteButton: PropTypes.bool,
};

InputAddition.defaultProps = {
  isShowDeleteButton: true,
  format: (data) => data,
  addButtonType: 'link',
};

const CollapsableInputAddition = (props) => {
  const { record, form } = useContext(RestInputContext);
  return <InputAddition {...props} {...{ record, form }} />;
};

export default CollapsableInputAddition;
