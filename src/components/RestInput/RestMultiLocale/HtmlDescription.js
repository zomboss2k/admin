import { Col, Input, Row } from 'antd';
import { renderToString } from 'react-dom/server';
import htmlParser from 'htmlstr-parser';
import { flattenDeep, groupBy, set, values } from 'lodash';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import HtmlDescriptionPreview from './HtmlDescriptionPreview';

const HtmlDescriptionStyle = styled.div`
  .h4 {
    font-size: 30px;
    font-weight: 700;
    font-family: 'Neue Plak Wide', Helvetica, Arial, sans-serif;
    font-style: normal;
    text-transform: uppercase;
  }
  .h5 {
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

export default function HtmlDescription({ data = [], onChange }) {
  const { t } = useTranslation();
  const onChangeText = (dataKey, value) => {
    set(data, dataKey, value);
    onChange(generateHTMLStr(data));
  };
  if (!data?.length) return null;
  return (
    <HtmlDescriptionStyle>
      <h5 className="mt-20">{t('Breakdown Content')}</h5>
      {data.map((e, index) => (
        <SectionWithList
          dataIndex={index}
          key={`HtmlDescription-${index}`}
          item={e}
          onChangeText={onChangeText}
        />
      ))}
    </HtmlDescriptionStyle>
  );
}

export const SectionWithImage = ({ item }) => (
  <div className="section-with-image">
    <Row align="center" gutter={[20, 20]}>
      <Col md={16}>
        <div className="section-infor">
          {item.title?.slice(0, item.title.length - 1).map((e, index) => (
            <HTMLRender key={`SectionWithImage-${String(index)}`} item={e} />
          ))}
        </div>
      </Col>
    </Row>
  </div>
);

export const SectionWithList = ({ item, dataIndex, onChangeText }) => (
  <div className="mb-30">
    {item?.title?.map((e, index) => (
      <HTMLRender
        dataIndex={`${dataIndex}.title.[${index}]`}
        key={`SectionWithList-${String(index)}`}
        item={e}
        onChangeText={onChangeText}
      />
    ))}
    <Row gutter={[16, 16]}>
      {item?.list?.map((e, index) => (
        <Col
          key={`SectionWithList2-${String(index)}`}
          md={item?.list?.length > 1 ? 12 : 24}
        >
          {e?.length > 1 && (
            <div className="mb-10">
              <HTMLRender
                onChangeText={onChangeText}
                dataIndex={`${dataIndex}.list.[${index}].[0].[0]`}
                item={e[0][0]}
              />
            </div>
          )}
          <Row gutter={[16, 16]}>
            {(e?.length > 1 ? e[1] : e[0])?.map((item, itemIndex) => (
              <Col key={`SectionWithList3-${String(index)}`} md={12}>
                <div className="flex-1">
                  {item.map((li, i) => (
                    <HTMLRender
                      dataIndex={`${dataIndex}.list.[${index}].[${
                        e?.length > 1 ? 1 : 0
                      }].[${itemIndex}].[${i}]`}
                      key={`SectionWithList4-${String(index)}`}
                      item={li}
                      onChangeText={onChangeText}
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

const HTMLRender = ({ item, dataIndex, onChangeText }) => {
  const tagName = item?.tagName || item?.parentTagName;
  if (!item || tagName === 'br') return <span />;
  if (['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li'].includes(tagName)) {
    const dataIndexContent = `${dataIndex}.content`;
    return (
      <Input.TextArea
        className={`mt-10 w-100 ${tagName}`}
        defaultValue={item?.content}
        onChange={(e) => onChangeText(dataIndexContent, e.target.value)}
      />
    );
  }

  return <div />;
};

export const generateHTMLStr = (data) => {
  return renderToString(<HtmlDescriptionPreview data={data} />);
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

HtmlDescription.propTypes = {
  data: PropTypes.array,
  thumbnail: PropTypes.string,
};

export const normallizeHTMLData = (htmlStr = '') => {
  const elms = htmlParser(htmlStr);
  const htmlFormatted = [];

  const breakdownElement = (elm, level, parentIndex) => {
    if (!elm?.children) {
      htmlFormatted[parentIndex].push({
        ...elm,
        parentIds: values(
          elm?.parentIds || {
            [`${htmlFormatted[parentIndex].length}`]: `${htmlFormatted[parentIndex].length}`,
          },
        ).filter((e) => e !== '0'),
        level,
      });
    } else {
      const parentIds = elm.parentIds
        ? {
            ...elm.parentIds,
            [`${htmlFormatted[parentIndex].length}`]: `${htmlFormatted[parentIndex].length}`,
          }
        : {
            [`${htmlFormatted[parentIndex].length}`]: `${htmlFormatted[parentIndex].length}`,
          };
      elm?.children?.forEach((e) =>
        breakdownElement(
          {
            parentIds,
            parentTagName: elm?.tagName,
            ...e,
          },
          level + 1,
          parentIndex,
        ),
      );
    }
  };

  elms.children?.forEach((e, index) => {
    htmlFormatted[index] = [];

    breakdownElement(e, 0, index);
  });

  const formattedData = [];

  htmlFormatted.forEach((e, index) => {
    formattedData[index] = { list: [], title: [] };
    values(groupBy(e, (a) => a.parentIds[0] || 0)).forEach((child) => {
      const subChild = groupBy(child, (a) => a?.parentTagName);
      if (subChild?.li) {
        subChild.li = values(
          groupBy(
            flattenDeep(subChild.li),
            (e) => e.parentIds[2] || e.parentIds[1] || 0,
          ),
        );
        formattedData[index].list.push(values(subChild));
      } else {
        formattedData[index].title.push(values(subChild));
      }
      formattedData[index].title = flattenDeep(formattedData[index].title);
    });
  });
  return formattedData;
};
