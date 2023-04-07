// import PropTypes from 'prop-types';
import { Card, Col, Row } from 'antd';
import RestInputItem from 'components/RestInput/RestInputItem';
import { useTranslation } from 'react-i18next';

const SocialLinks = () => {
  const { t } = useTranslation();

  return (
    <Card className="mt-30" title={t('profile.social')}>
      <Row gutter={16}>
        <Col md={12}>
          <RestInputItem
            source="artist.socialLinks.facebook"
            header="artists.facebook"
            rules={[
              {
                type: 'url',
                message: t('error.invalidUrl'),
              },
            ]}
          />
          <RestInputItem
            source="artist.socialLinks.twitter"
            header="artists.twitter"
            rules={[
              {
                type: 'url',
                message: t('error.invalidUrl'),
              },
            ]}
          />
          <RestInputItem
            source="artist.socialLinks.tiktok"
            header="socials.tiktok"
            rules={[
              {
                type: 'url',
                message: t('error.invalidUrl'),
              },
            ]}
          />
          <RestInputItem
            source="artist.socialLinks.blog"
            header="socials.blog"
            rules={[
              {
                type: 'url',
                message: t('error.invalidUrl'),
              },
            ]}
          />
        </Col>
        <Col md={12}>
          <RestInputItem
            source="artist.socialLinks.instagram"
            header="artists.instagram"
            rules={[
              {
                type: 'url',
                message: t('error.invalidUrl'),
              },
            ]}
          />
          <RestInputItem
            source="artist.socialLinks.linkedin"
            header="artists.linkedin"
          />
          <RestInputItem
            source="artist.socialLinks.website"
            header="socials.website"
            rules={[
              {
                type: 'url',
                message: t('error.invalidUrl'),
              },
            ]}
          />
          <RestInputItem
            source="artist.socialLinks.other"
            header="socials.other"
            rules={[
              {
                type: 'url',
                message: t('error.invalidUrl'),
              },
            ]}
          />
        </Col>
      </Row>
    </Card>
  );
};

SocialLinks.propTypes = {};

export default SocialLinks;
