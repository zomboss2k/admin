import NotificationList from 'containers/Notifications/List';
import { useTranslation } from 'react-i18next';
import { DrawerStyles } from './styles';

const Notifications = (props) => {
  const { t } = useTranslation();
  return (
    <DrawerStyles
      title={t('notifications.header')}
      width={370}
      placement="right"
      style={{ padding: 0 }}
      {...props}
    >
      <NotificationList {...props} />
    </DrawerStyles>
  );
};

export default Notifications;
