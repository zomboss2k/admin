import Text from '../Text';
import ParagraphStyles from './styles';
import { useTranslation } from 'react-i18next';

const Paragraph = (props) => {
  const { t } = useTranslation();
  return (
    <ParagraphStyles>
      <Text type="h5" className="title-paragraph">
        {t(props?.title)}
      </Text>
      <p>{props?.content}</p>
    </ParagraphStyles>
  );
};

Paragraph.propTypes = {};
export default Paragraph;
