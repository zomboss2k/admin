import { Anchor, Button, Card, Col, Form, Row } from 'antd';
import PreviewImage from 'components/common/PreviewImage';
import RestAvatarInput from 'components/RestInput/RestAvatarInput';
import { RestInputContext } from 'components/RestInput/RestInputContext';
import RestInputItem from 'components/RestInput/RestInputItem';
import RestSelect from 'components/RestInput/RestSelect';
import RestReferenceInput from 'containers/rest/ReferenceInput';
import _, { zipObjectDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateCurrentUser } from '@redux/auth/actions';
import { plainToFlattenObject } from 'utils/tools';
import ChangePassword from './components/ChangePassword';
import ProfileForm from './components/Form';
import ArtistsForm from './components/Form/ArtistForm';
import ProfileInfoStyles from './styles';

const ProfileInfo = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { validateFields } = form;
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.auth.data);
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState([]);

  const onSelectHighlight = (value) => {
    setImages(value);
    return value.filter((e) => e);
  };

  const handleSubmit = () => {
    // eslint-disable-next-line
    validateFields().then(async ({ email, ...values }) => {
      setLoading(true);
      const parseToObj = zipObjectDeep(Object.keys(values), _.values(values));
      dispatch(updateCurrentUser(parseToObj))
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
      setIsEdit(!isEdit);
    });
  };

  useEffect(() => {
    if (currentUser?.id && isEdit) {
      form.setFieldsValue({
        ...plainToFlattenObject(currentUser),

        'artist.images': currentUser?.artist?.images || [],
      });
    }
  }, [currentUser, form, isEdit]);

  return (
    <ProfileInfoStyles>
      <Form
        layout="vertical"
        initialValues={plainToFlattenObject(currentUser)}
        form={form}
        onFinish={handleSubmit}
      >
        <Anchor offsetTop={64}>
          <div className="w-100 d-flex flex-end right pt-10 pb-10">
            <Button onClick={() => history.goBack()} type="text">
              {t('button.cancel')}
            </Button>
            <ChangePassword />
            <Button
              loading={loading}
              onClick={handleSubmit}
              style={{ width: 100, marginLeft: 10 }}
              type="primary"
            >
              {t('button.save')}
            </Button>
          </div>
        </Anchor>
        <br />
        <RestInputContext.Provider
          value={{
            form,
            record: currentUser,
            handleSubmit,
          }}
        >
          <Row gutter={[20, 20]}>
            <Col md={6}>
              <RestAvatarInput
                className="avatar-section"
                source="artist.thumbnail"
                header="profile.avatar"
              />
              <br />
              {!!currentUser?.artist?.id && (
                <RestInputItem isReference>
                  <RestReferenceInput
                    initialFilter={{
                      filter: {
                        artistId: currentUser?.artist?.id,
                      },
                    }}
                    mappedBy="thumbnail"
                    source="artist.images"
                    resource="artworks"
                  >
                    <RestSelect
                      ruleType="array"
                      formOptions={{ getValueFromEvent: onSelectHighlight }}
                      selectProps={{ mode: 'multiple' }}
                      header="artists.selectHighlightPic"
                      valueProp="thumbnail"
                      titleProp="name"
                    />
                  </RestReferenceInput>
                </RestInputItem>
              )}
              {images.map((e) => (
                <PreviewImage key={e} src={e} />
              ))}
            </Col>
            <Col md={18}>
              <Card title={t('profile.personalInfo')}>
                <ProfileForm record={currentUser} form={form} />
              </Card>
              <br />
              {currentUser?.role === 'ARTIST' && <ArtistsForm />}
              <br />
              {currentUser?.role === 'GALLERY' && (
                <Card title={t('profile.galleryInfo')}>
                  <Form initialValues={currentUser} form={form}>
                    {/* <ProfileForm record={currentUser} form={form} /> */}
                  </Form>
                </Card>
              )}
            </Col>
          </Row>
        </RestInputContext.Provider>
      </Form>
    </ProfileInfoStyles>
  );
};

ProfileInfo.propTypes = {};

export default ProfileInfo;
