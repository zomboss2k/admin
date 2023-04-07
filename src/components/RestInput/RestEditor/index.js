import { EditOutlined } from '@ant-design/icons';
import { setOpenEditor } from '@redux/cmsController/actions';
import { Button, Drawer, Form, Input, Space, Typography } from 'antd';
import { getUrl } from 'api/uploadMedia';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { debounce, get } from 'lodash';
import PropTypes from 'prop-types';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getRecordData } from 'utils/tools';
import FormItem from '../../form/FormItem';
import { RestInputContext } from '../RestInputContext';
import RestEditorWrapper from './styles';

const DrawerStyle = styled(Drawer)`
  .ant-drawer-body {
    padding: 0px;
  }
`;

const uploadFn = async (param) => {
  const responseS3 = await getUrl(param.file.name, param.file.type);

  const xhr = new XMLHttpRequest();

  const successFn = () => {
    param.success({
      url: responseS3.url,
      meta: {
        id: responseS3.name,
        title: responseS3.name,
        alt: responseS3.name,
        loop: true,
        autoPlay: true,
        controls: true,
        poster: responseS3.url,
      },
    });
  };

  const progressFn = (event) => {
    param.progress((event.loaded / event.total) * 100);
  };

  const errorFn = () => {
    param.error({
      msg: 'unable to upload.',
    });
  };

  xhr.upload.addEventListener('progress', progressFn, false);
  xhr.addEventListener('load', successFn, false);
  xhr.addEventListener('error', errorFn, false);
  xhr.addEventListener('abort', errorFn, false);

  xhr.open('PUT', responseS3.uploadUrl, true);
  xhr.send(param.file);
};

const RestEditor = (props) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [isOpenOldEditor, setOpenOldEditor] = useState(false);
  const { record, form, handleSubmit } = useContext(RestInputContext);
  const { t } = useTranslation();
  // eslint-disable-next-line
  const onChange = useCallback(
    debounce((e) => {
      form.setFieldsValue({
        [props.source]: e,
      });
    }, 300),
    [props.source, form],
  );

  const onChangeOldEditor = useCallback(
    debounce(
      (e) =>
        form.setFieldsValue({
          [props.source]: e?.toHTML(),
        }),
      300,
    ),
    [props.source, form],
  );

  const openOldEditor = () => {
    setOpenOldEditor(true);
    dispatch(setOpenEditor(true));
    setTimeout(() => {
      ref.current?.setValue(
        BraftEditor.createEditorState(
          getRecordData(record, props.source) || props.defaultValue,
        ),
      );
    }, 300);
  };

  const closeEditor = () => {
    dispatch(setOpenEditor(false));
    setOpenOldEditor(false);
    record?.id && handleSubmit({ isBack: false });
  };

  useEffect(() => {
    if (record?.id) {
      let div = document.createElement('div');
      div.innerHTML = getRecordData(record, props.source) || '';

      form.setFieldsValue({
        [props.source]:
          form.getFieldValue(props.source) ||
          getRecordData(record, props.source) ||
          props.defaultValue,
      });
    }
  }, [record, record.id, form, props.source, props.defaultValue]);

  useEffect(() => {
    if (record) {
      ref.current?.setValue(
        BraftEditor.createEditorState(
          form.getFieldValue(props.source) ||
            getRecordData(record, props.source) ||
            props.defaultValue,
        ),
      );
    }
  }, [record, ref, form, props.source, props.defaultValue]);

  return (
    <>
      <RestEditorWrapper>
        <FormItem
          {...props}
          form={form}
          formOptions={{ trigger: 'onChange' }}
          defaultValue={
            getRecordData(record, props.source) || props.defaultValue
          }
          name={props.source}
          source={props.source}
          noStyle
        >
          <Input style={{ display: 'none' }} />
        </FormItem>
        <Form.Item
          label={
            <Space direction="horizontal">
              {t(props.header)}
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => openOldEditor()}
              >
                Editor
              </Button>
            </Space>
          }
        >
          <Form.Item
            shouldUpdate={(o, n) =>
              get(o, props.source) !== get(n, props.source)
            }
          >
            {({ getFieldValue }) => (
              <PreviewHtml
                html={
                  getFieldValue(props.source) ||
                  getRecordData(record, props.source) ||
                  props.defaultValue
                }
              />
            )}
          </Form.Item>
        </Form.Item>
      </RestEditorWrapper>
      <DrawerStyle
        // closable={false}
        width="100%"
        height="100%"
        open={isOpenOldEditor}
        style={{ top: 0 }}
        destroyOnClose
        onClose={() => closeEditor()}
        closeIcon={<>{t('button.save')}</>}
      >
        <BraftEditor
          ref={ref}
          onChange={onChangeOldEditor}
          // excludeControls={['media']}
          language="en"
          media={{ uploadFn }}
          contentStyle={{ height: '100%' }}
        />
      </DrawerStyle>
    </>
  );
};

export const PreviewHtml = ({ html = '' }) => {
  return (
    <Typography.Paragraph
      ellipsis={{
        rows: 3,
        expandable: true,
      }}
    >
      <div
        id="html-preview-content"
        className="html-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Typography.Paragraph>
  );
};

PreviewHtml.propTypes = {
  html: PropTypes.string,
};

RestEditor.propTypes = {
  source: PropTypes.string,
  record: PropTypes.object,
  defaultValue: PropTypes.any,
  valuePropName: PropTypes.any,
  formOptions: PropTypes.object,
  header: PropTypes.string,
};

RestEditor.defaultProps = {};

export default RestEditor;
