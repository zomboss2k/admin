import { Avatar, Card, List } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const data = [
  {
    title: 'Zig Kinetica 2',
    sku: 'HGH2Q_L',
    count: 5,
  },
  {
    title: 'Zig Kinetica 2',
    sku: 'HGH2Q_L',
    count: 5,
  },
  {
    title: 'Zig Kinetica 2',
    sku: 'HGH2Q_L',
    count: 5,
  },
  {
    title: 'Zig Kinetica 2',
    sku: 'HGH2Q_L',
    count: 5,
  },
  {
    title: 'Zig Kinetica 2',
    sku: 'HGH2Q_L',
    count: 5,
  },
];

const MostAvailableInStockStyle = styled(Card)`
  height: 100%;
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

export default function MostAvailableInStock() {
  const { t } = useTranslation();

  return (
    <MostAvailableInStockStyle title={t('summaries.mostAvailable')}>
      <List
        renderItem={(item) => (
          <List.Item actions={[<b key="1">5</b>]}>
            <List.Item.Meta
              avatar={
                <Avatar
                  shape="square"
                  className="avatar"
                  src="https://image.hsv-tech.io/400x0/common/ee181b26-9517-42e4-8a67-9715bf02bae5.webp"
                />
              }
              title={<a>{item.title}</a>}
              description={item?.sku}
            />
          </List.Item>
        )}
        dataSource={data}
      />
    </MostAvailableInStockStyle>
  );
}
