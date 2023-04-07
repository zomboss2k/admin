import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import DOMPurify from 'isomorphic-dompurify';
import styled from 'styled-components';
import { getImageUrl } from 'utils/tools';

const HtmlDescriptionStyle = styled.div`
  h4 {
    font-size: 30px;
    font-weight: 700;
    font-family: 'Neue Plak Wide', Helvetica, Arial, sans-serif;
    font-style: normal;
    text-transform: uppercase;
  }
  h5 {
    font-size: var(--font-size-xl);
    font-weight: 700;
    font-family: 'Neue Plak Wide', Helvetica, Arial, sans-serif;
    font-style: normal;
    text-transform: uppercase;
  }
  p {
    font-size: var(--font-size-l);
    margin-top: 10px;
  }

  li {
    font-size: var(--font-size-m);
    list-style: none;
  }

  .section-infor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }

  .section-with-image {
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

export default function HtmlDescriptionPreview({ data, thumbnail }) {
  return (
    <HtmlDescriptionStyle>
      <SectionWithImage thumbnail={thumbnail} item={data[0]} />
      {data.slice(1, data.length).map((e, index) => (
        <SectionWithList key={String(index)} item={e} />
      ))}
    </HtmlDescriptionStyle>
  );
}

export const SectionWithImage = ({ item, thumbnail }) => (
  <div className="section-with-image">
    <Row align="center" gutter={[20, 20]}>
      <Col md={16}>
        <div className="section-infor">
          {item.title?.slice(0, item.title.length - 1).map((e, index) => (
            <HTMLRender key={`firstSection-${String(index)}`} item={e} />
          ))}
        </div>
      </Col>
      <Col md={8}>
        <img
          src={getImageUrl(
            item?.title?.[item?.title?.length - 1].attributes?.src || thumbnail,
          )}
          alt="Devtify"
        />
      </Col>
    </Row>
  </div>
);

export const SectionWithList = ({ item }) => (
  <div className="mb-30">
    {item?.title?.map((e, index) => (
      <HTMLRender key={`firstSection-${String(index)}`} item={e} />
    ))}
    <Row gutter={[16, 16]}>
      {item?.list?.map((e, index) => (
        <Col
          key={`firstSection-${String(index)}`}
          md={item?.list?.length > 1 ? 12 : 24}
        >
          {e?.length > 1 && (
            <div className="mb-10">
              <HTMLRender item={e[0][0]} />
            </div>
          )}
          <Row gutter={[16, 16]}>
            {(e?.length > 1 ? e[1] : e[0])?.map((item) => (
              <Col key={`firstSection-${String(index)}`} md={12}>
                <div className="d-flex">
                  {item.length === 1 && <div className="mr-10 size-l">•</div>}
                  {item.map((li) => (
                    <HTMLRender
                      key={`firstSection-${String(index)}`}
                      item={li}
                    />
                  ))}
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      ))}
    </Row>
  </div>
);

const HTMLRender = ({ item }) => {
  const tagName = item?.tagName || item?.parentTagName;
  if (!item || tagName === 'br') return <span />;
  if (['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li'].includes(tagName)) {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify?.sanitize?.(
            `<${tagName}>${item?.content}</${tagName}>`,
          ),
          // ),
        }}
      />
    );
  }

  if (tagName === 'img') {
    return <img {...item.attributes} alt="devtify" />;
  }

  if (tagName === 'ul') {
    return (
      <ul>
        {item?.items?.map((e, index) => (
          <li key={String(index)}>{e?.content}</li>
        ))}
      </ul>
    );
  }
  return <div />;
};

HTMLRender.propTypes = {
  item: PropTypes.object,
};

SectionWithList.propTypes = {
  item: PropTypes.object,
};

SectionWithImage.propTypes = {
  item: PropTypes.object,
  thumbnail: PropTypes.string,
};

HtmlDescriptionPreview.propTypes = {
  data: PropTypes.array,
  thumbnail: PropTypes.string,
};
