import { useState } from 'react';
import { Button, Col, Divider, Progress, Row } from 'antd';
import { getAllApi, putApi } from 'api/crud';
import { flatMap } from 'lodash';

const RESOURCES = ['products', 'product-collections', 'product-categories'];

function checkUTF8(text) {
  try {
    // Try to convert to utf-8
    decodeURIComponent(escape(text));
    // If the conversion succeeds, text is not utf-8
    return true;
  } catch (e) {
    // console.log(e.message); // URI malformed
    // This exception means text is utf-8
    return false;
  }
}

const updateData = async (data, resource, onSuccess) => {
  const _data = { ...data };
  const detailLang = data.detail?.map((e) => e.langCode);
  _data.detail[0].langCode = detailLang[1];
  _data.detail[1].langCode = detailLang[0];
  await putApi(resource, data.id, '', {
    detail: _data.detail,
  });
  onSuccess();
};

const getAllData = async (resource, firstPage) => {
  const req = [];
  for (let page = 1; page < firstPage.pageCount; page++) {
    req.push(getAllApi(resource, { page, limit: 50, join: 'detail' }));
  }
  const data = await Promise.all(req);
  const formattedData = flatMap([firstPage, ...data], 'data');
  return formattedData;
};

export default function CheckImageResourceFail() {
  const [loading, setLoading] = useState(false);
  const [summaries, setSummaries] = useState([]);
  // const [resourceDatas, setData] = useState([]);
  // const [updateProgress, setUpdateProgress] = useState({
  //   products: 0,
  //   'product-collections': 0,
  //   'product-categories': 0,
  // });

  const onChecking = async () => {
    setLoading(true);
    const totals = await Promise.all(
      RESOURCES.map((e) => getAllApi(e, { limit: 50, join: 'detail' })),
    );
    const datas = await Promise.all(
      totals.map((e, index) => getAllData(RESOURCES[index], e)),
    );
    // setData(datas);
    const _summaries = datas.map((items, index) => {
      const wrongDetails = [];

      items.forEach((item) => {
        item.detail?.forEach((e) => {
          if (e.langCode === 'en' && checkUTF8(e.htmlDescription)) {
            wrongDetails.push(item);
          }
        });
      });
      return {
        wrongDetails,
        wrongDetailsPercent: wrongDetails.length / items.length,
        id: RESOURCES[index],
      };
    });

    setLoading(false);
    setSummaries(_summaries);
  };

  const updateWrongContent = async (e) => {
    setLoading(true);
    let a = 0;
    e.wrongDetails.forEach((item, index) => {
      setTimeout(() => {
        updateData(item, e.id, () => {
          a += 1;
          if (a === e.wrongDetails.length) {
            setLoading(false);
          }
          // setUpdateProgress((old) => ({
          //   ...old,
          //   [e.id]: old[e.id] + 1,
          // }));
        });
      }, index * 600);
    });
  };

  return (
    <div>
      <Button loading={loading} onClick={onChecking}>
        Check Image Resource Fail
      </Button>
      {summaries?.map((e) => (
        <div key={e.id}>
          <Divider>{e.id}</Divider>
          <Row>
            <Col className="text-center" md={24}>
              <Progress
                type="circle"
                percent={e.wrongDetailsPercent}
                format={() => 0}
              />
              <h2>Wrong Content</h2>
            </Col>
            <Col className="text-center" md={24}>
              <Progress percent={0} />
              <Button
                onClick={() => updateWrongContent(e)}
                loading={loading}
                danger
                type="primary"
              >
                {`Update wrong Content for ${e.id}`}
              </Button>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}
