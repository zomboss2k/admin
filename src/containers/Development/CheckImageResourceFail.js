import { useState } from 'react';
import { Button, Col, Divider, Progress, Row } from 'antd';
import { getAllApi, putApi } from 'api/crud';
import { flatMap } from 'lodash';
import { getUrl, isImage, uploadMedia } from 'api/uploadMedia';

import slug from 'slug';

const RESOURCES = ['products', 'product-collections', 'product-categories'];

const updateData = async (data, resource, onSuccess) => {
  const resS3 = await getUrl(
    `${slug(data.thumbnail)}.webp`,
    'image/webp',
    resource,
  );
  await uploadMedia(resS3.uploadUrl, data.thumbnail);
  await putApi(resource, data.id, '', {
    thumbnail: resS3.name,
  });
  // console.log(resS3.url);
  onSuccess();
};

const getAllData = async (resource, firstPage) => {
  const req = [];
  for (let page = 1; page < firstPage.pageCount; page++) {
    req.push(getAllApi(resource, { page, limit: 50 }));
  }
  const data = await Promise.all(req);
  const formattedData = flatMap([firstPage, ...data], 'data');
  return formattedData;
};

export default function CheckImageResourceFail() {
  const [loading, setLoading] = useState(false);
  const [summaries, setSummaries] = useState([]);
  // const [resourceDatas, setData] = useState([]);
  const [updateProgress, setUpdateProgress] = useState({
    products: 0,
    'product-collections': 0,
    'product-categories': 0,
  });

  const onChecking = async () => {
    setLoading(true);
    const totals = await Promise.all(
      RESOURCES.map((e) => getAllApi(e, { limit: 50 })),
    );
    const datas = await Promise.all(
      totals.map((e, index) => getAllData(RESOURCES[index], e)),
    );
    // setData(datas);
    const _summaries = datas.map((items, index) => {
      const nullImages = [];
      const wrongImages = [];

      items.forEach((item) => {
        if (!item.thumbnail) {
          nullImages.push(item);
          return;
        }

        if (isImage(item.thumbnail) && item.thumbnail.indexOf('webp') === -1) {
          wrongImages.push(item);
          return;
        }
      });
      return {
        nullImages,
        wrongImages,
        nullPercent: items.length
          ? (nullImages.length / items.length) * 100
          : 0,
        wrongImagesPercent: items.length
          ? (wrongImages.length / items.length) * 100
          : 0,
        id: RESOURCES[index],
      };
    });

    setLoading(false);
    setSummaries(_summaries);
  };

  const updateWrongImages = async (e) => {
    setLoading(true);
    let a = 0;
    e.wrongImages.forEach((item, index) => {
      setTimeout(() => {
        updateData(item, e.id, () => {
          a += 1;
          if (a === e.wrongImages.length) {
            setLoading(false);
          }
          setUpdateProgress((old) => ({
            ...old,
            [e.id]: old[e.id] + 1,
          }));
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
            <Col className="text-center" md={12}>
              <Progress
                type="circle"
                percent={e.nullPercent}
                status="exception"
                format={() => e.nullImages.length}
              />
              <h2>Null Images</h2>
            </Col>
            <Col className="text-center" md={12}>
              <Progress
                type="circle"
                percent={e.wrongImagesPercent}
                format={() => e.wrongImages.length}
              />
              <h2>Wrong Images</h2>
            </Col>
            <Col className="text-center" md={24}>
              <Progress
                percent={
                  (updateProgress[e.id] / (e.wrongImages.length || 1)) * 100
                }
              />
              <Button
                onClick={() => updateWrongImages(e)}
                loading={loading}
                danger
                type="primary"
              >
                {`Update wrong Images for ${e.id}`}
              </Button>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  );
}
