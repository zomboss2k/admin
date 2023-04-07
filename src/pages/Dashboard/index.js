import { Col, Row } from 'antd';
import PageTitle from 'components/common/PageTitle';
import SummaryCard from 'components/common/SummaryCard';
import Cancellation from 'containers/Dashboard/Cancellation';
import MostAvailableInStock from 'containers/Dashboard/MostAvailableInStock';
import MostPurchased from 'containers/Dashboard/MostPurchased';
import PaymentMethods from 'containers/Dashboard/PaymentMethods';
import Revenue from 'containers/Dashboard/Revenue';
import Sales from 'containers/Dashboard/Sales';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  const [summaries] = useState({});

  return (
    <>
      <PageTitle>{t('sideBar.dashboard')}</PageTitle>
      <br />
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <SummaryCard
            value={summaries?.deliveredFail ?? 'N/A'}
            subTitle={t('summaries.totalFailed')}
            href="#"
          />
        </Col>
        <Col xs={24} md={12}>
          <SummaryCard
            value={summaries?.in_shipment || 0}
            subTitle={t('summaries.totalProcessing')}
            href="#"
          />
        </Col>
        <Col xs={24} md={6}>
          <SummaryCard
            value={summaries?.completed ?? 'N/A'}
            subTitle={t('summaries.totalUsers')}
            href="#"
          />
        </Col>

        <Col xs={24} md={6}>
          <MostPurchased />
        </Col>
        <Col xs={24} md={12}>
          <Revenue summaries={summaries} />
        </Col>
        <Col xs={24} md={6}>
          <Sales />
        </Col>
        <Col md={18} xs={24}>
          <Row gutter={[16, 16]}>
            <Col md={8}>
              <MostAvailableInStock />
            </Col>
            <Col md={16}>
              <Cancellation summaries={summaries} />
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={6}>
          <PaymentMethods />
        </Col>
      </Row>
    </>
  );
};
Home.propTypes = {};

export default Home;
