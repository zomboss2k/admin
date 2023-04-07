import { Card, List } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { formatMoney } from 'utils/textUtils';

const CancellationStyle = styled(Card)`
  margin-top: 15px;
  .avatar {
    width: 39px;
    height: 39px;
    border-radius: 5px;
  }
  .ant-list-item-meta-title {
    color: #475569;
    font-weight: 400;
    margin-bottom: 0px;
  }
  .ant-list-item-meta-description {
    font-size: 12px;
  }
  .ant-list-item {
    align-items: flex-start;
  }
  .ant-list-item-action {
    li {
      font-weight: 500;
      font-size: 14px;
    }
  }
  .txt-header {
    color: #94a3b8;
    font-weight: 600;
    font-size: 14px;
  }
  .value {
    font-weight: 700;
    font-size: 28px;
  }
`;

export default function Cancellation({ summaries }) {
  const { t } = useTranslation();

  const data = [
    {
      title: t('summaries.failReason.emailError'),
      value: 0.487,
      color: '#6366F1',
    },
    {
      title: t('summaries.failReason.outOfLimit'),
      value: 0.249,
      color: '#3730A3',
    },
    {
      title: t('summaries.failReason.wrongNetwork'),
      value: 0.193,
      color: '#38BDF8',
    },
    {
      title: t('summaries.failReason.wrongApiCall'),
      value: 0.096,
      color: '#34D399',
    },
    {
      title: t('summaries.failReason.other'),
      value: 0.093,
      color: '#9CA3AF',
    },
  ];
  return (
    <CancellationStyle title={t('summaries.failed')}>
      <div className="w-full d-flex" size={20}>
        <div>
          <div className="txt-header">No.</div>
          <div style={{ color: '#F26D65' }} className="value">
            {summaries?.cancelled || 0}
          </div>
        </div>
        <div className="ml-20">
          <div className="txt-header">{t('summaries.margin')}</div>
          <div className="value">20%</div>
        </div>
        <div className="flex-1 ml-20">
          <div className="txt-header">{t('summaries.value')}</div>
          <div className="value">{formatMoney(30000000)}</div>
        </div>
        <div className="ml-20">
          <div className="txt-header">{t('summaries.byUserAndAdmin')}</div>
          <div className="value">20%</div>
        </div>
      </div>
      <div className="d-flex mt-15 mb-15">
        {data.map((e) => (
          <div
            style={{
              height: 30,
              width: `${e.value * 100}%`,
              backgroundColor: e.color,
            }}
            key={e.title}
          />
        ))}
      </div>
      <List
        renderItem={(item) => (
          <List.Item
            actions={[
              <b key="1" style={{ color: item.color }}>
                {`${(item.value * 100).toFixed(1)}%`}
              </b>,
            ]}
          >
            <List.Item.Meta
              title={
                <div className="d-flex">
                  <div
                    style={{
                      background: item.color,
                      width: 13,
                      height: 13,
                      marginRight: 10,
                    }}
                  />
                  {item.title}
                </div>
              }
            />
          </List.Item>
        )}
        dataSource={data}
      />
    </CancellationStyle>
  );
}
