import { LOCALES_DATA } from 'configs/localData';
import RestEditor from '../RestEditor';
import RestInputItem from '../RestInputItem';
import { Tabs } from 'antd';
import get from 'lodash/get';
import RestHiddenInput from '../RestHiddenInput';
import React, { useState, useContext, useEffect } from 'react';
import { plainToFlattenObject } from 'utils/tools';
import styled from 'styled-components';
import { RestInputContext } from '../RestInputContext';
// import { findIndex, get } from 'lodash';

const { TabPane } = Tabs;

export default function RestTranslates({
  defaultValue = {},
  source = 'detail',
  name = 'products',
  children,
}) {
  // const [activeKey, setActiveKey] = useState('vi');
  // const [visible, setVisible] = useState(false);
  // const [newLocale, setNewLocale] = useState();
  const [panes] = useState(Object.values(LOCALES_DATA));
  const { record, form } = useContext(RestInputContext);

  // const remove = (targetKey) => {
  //   const lastIndex = findIndex(panes, (e) => e.value === activeKey);
  //   const newPanes = panes.filter(
  //     (e) => e.value.toLowerCase() !== targetKey.toLowerCase(),
  //   );
  //   setPanes([...newPanes]);
  //   setActiveKey(
  //     newPanes[lastIndex]?.value?.toLowerCase() ||
  //       newPanes[lastIndex - 1]?.value?.toLowerCase() ||
  //       'vi',
  //   );
  // };

  // const handleOk = () => {
  //   form.setFieldsValue({
  //     [`translates.${panes.length}.langCode`]: newLocale,
  //   });
  //   setPanes((old) => [
  //     ...old,
  //     LOCALES.find((e) => e.value.toLowerCase() === newLocale),
  //   ]);
  //   setNewLocale();
  //   setVisible(false);
  // };

  // const onEdit = (targetKey, action) => {
  //   switch (action) {
  //     case 'add':
  //       setVisible(true);
  //       break;
  //     case 'remove':
  //       remove(targetKey);
  //       break;
  //     default:
  //   }
  // };

  // const availableLocales = useMemo(
  //   () => LOCALES.filter((e) => !panes.find((pane) => pane?.value === e.value)),
  //   [panes],
  // );

  // useEffect(() => {
  //   if (get(record, `detail`)) {
  //     setPanes(
  //       uniqBy([
  //         ...get(record, `detail`).map(translate => ({
  //           ...translate,
  //         })),
  //         ...LOCALES.map(locale => ({
  //           ...locale,
  //           langCode: locale.value,
  //         })),
  //       ], 'langCode').map((locale) =>
  //         LOCALES.find((e) => e.value.toLowerCase() === locale?.langCode),
  //       ),
  //     );
  //   }
  // }, [record]);
  useEffect(() => {
    if (get(record, `detail`)) {
      form.setFieldsValue({
        ...plainToFlattenObject({ detail: get(record, 'detail') }),
      });
    }
    // eslint-disable-next-line
  }, [record]);

  return (
    <>
      <TabsWrapper
        // onChange={onChange}
        // activeKey={activeKey}
        type="card"
        // onEdit={onEdit}
      >
        {panes?.map((pane, index) => (
          <TabPane
            forceRender
            tab={pane?.text}
            tabKey={pane?.value.toLowerCase()}
            key={pane?.value.toLowerCase()}
            closable={pane?.closable}
          >
            {children ? (
              <>
                <RestHiddenInput
                  defaultValue={pane?.value}
                  source={`${source}.${index}.langCode`}
                />
                {React.Children.map(children, (node) =>
                  React.cloneElement(node, {
                    record,
                    key: `${source}.${index}.${node.props.source}`,
                    parentSource: source,
                    source: `${source}.${index}.${node.props.source}`,
                  }),
                )}
              </>
            ) : (
              <>
                <RestHiddenInput
                  defaultValue={pane?.value}
                  source={`${source}.${index}.langCode`}
                />
                <RestInputItem
                  source={`${source}.${index}.name`}
                  header={`${name}.name`}
                />
                {/* <RestInputItem
                source={`${source}.${index}.description`}
                header={`${name}.description`}
              />
              <RestInputItem
                source={`${source}.${index}.detail`}
                header={`${name}.detail`}
              /> */}
                <RestEditor
                  source={`${source}.${index}.htmlDescription`}
                  header={`${name}.htmlDescription`}
                  defaultValue={get(
                    defaultValue,
                    `${source}.${index}.htmlDescription`,
                  )}
                />
              </>
            )}
          </TabPane>
        ))}
      </TabsWrapper>
      {/* <Modal
        title={t('popup.selectNewLocale')}
        open={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
      >
        <Radio.Group onChange={e => setNewLocale(e.target.value)}>
          <Row gutter={[10, 10]}>
            {availableLocales.map((e) => (
              <Col span={24} key={e.value}>
                <Radio value={e.value.toLowerCase()}>
                  {e.text}
                </Radio>
              </Col>
            ))}
          </Row>
        </Radio.Group>
      </Modal> */}
    </>
  );
}

const TabsWrapper = styled(Tabs)`
  .ant-tabs-tab-active {
    font-weight: bold;
  }
`;
