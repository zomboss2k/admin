import { Col, Row } from 'antd';
import SummaryCard from 'components/common/SummaryCard';
import { useTranslation } from 'react-i18next';

export default function InShipment() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="size-20 mt-50 mb-20 fw-600">
        {t('orderStatus.inShipmentOnly')}
      </div>
      <Row gutter={[16, 16]}>
        <Col md={6} sm={12} xs={24}>
          <SummaryCard subTitle="Ahamove" value="N/A" href="/pendingOrders" />
        </Col>
        <Col md={6} sm={12} xs={24}>
          <SummaryCard
            subTitle="Giao Hang Nhanh"
            value="N/A"
            href="/pendingOrders"
          />
        </Col>
        <Col md={6} sm={12} xs={24}>
          <SummaryCard
            subTitle="Tiki Smart Delivery"
            value="N/A"
            href="/pendingOrders"
          />
        </Col>
      </Row>
    </div>
  );
}
