import { Card, List } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const OrderDestinationStyle = styled(Card)`
  margin-top: 16px;
  .avatar {
    width: 39px;
    height: 39px;
    border-radius: 5px;
  }
  .ant-list-item-meta-title {
    font-weight: 500;
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
      color: ${({ theme }) => theme.palette.primary};
      font-weight: 600;
      font-size: 14px;
    }
  }
`;

const data = [
  {
    title: 'Ho Chi Minh City',
    value: '45% (400)',
  },
  {
    title: 'Hanoi',
    value: '45% (400)',
  },
];

export default function OrderDestination() {
  const { t } = useTranslation();
  return (
    <OrderDestinationStyle title={t('summaries.orderDestination')}>
      <List
        renderItem={(item) => (
          <List.Item actions={[<b key="1">{item.value}</b>]}>
            <List.Item.Meta title={<a>{item.title}</a>} />
          </List.Item>
        )}
        dataSource={data}
      />
    </OrderDestinationStyle>
  );
}
