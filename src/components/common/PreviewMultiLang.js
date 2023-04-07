import { Form, Tabs } from 'antd';
import { LOCALES } from 'configs/localData';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

export default function PreviewMultiLang({ detail = [] }) {
  const { t } = useTranslation();
  return (
    <Form layout="vertical">
      <Tabs>
        {LOCALES.map((e) => {
          const localeDetail = detail.find((d) => d?.langCode === e.value);

          return (
            <Tabs.TabPane tab={e.text} key={e.value} tabKey={e.value}>
              <Form.Item label={t('name')}>
                {localeDetail?.name || 'N/A'}
              </Form.Item>
              {!!localeDetail?.description && (
                <Form.Item label={t('description')}>
                  {localeDetail?.description || 'N/A'}
                </Form.Item>
              )}
              <Form.Item label={t('htmlDescription')}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: localeDetail?.htmlDescription || 'N/A',
                  }}
                />
              </Form.Item>
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </Form>
  );
}

PreviewMultiLang.propTypes = {
  detail: PropTypes.array,
};
