import { Button, Card, Col, Form, Row } from 'antd';
import { RestInputContext } from 'components/RestInput/RestInputContext';
import _, { omit, zipObjectDeep } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser } from '@redux/auth/actions';
import { plainToFlattenObject } from '../../../../utils/tools';
import ProfileForm from '../Form';
import ArtistsForm from '../Form/ArtistForm';
import ProfileInfoStyles from './styles';

const ProfileInfo = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { validateFields } = form;
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.data);
  const handleSubmit = () => {
    validateFields().then((values) => {
      const parseToObj = zipObjectDeep(
        Object.keys(omit(values, 'email')),
        _.values(omit(values, 'email')),
      );
      dispatch(updateCurrentUser(parseToObj));
      setIsEdit(!isEdit);
    });
  };

  useEffect(() => {
    if (currentUser?.id && isEdit) {
      form.setFieldsValue(plainToFlattenObject(currentUser));
    }
  }, [currentUser, form, isEdit]);

  return (
    <ProfileInfoStyles>
      <div className="edit-section">
        <Form
          initialValues={plainToFlattenObject(currentUser)}
          form={form}
          onFinish={handleSubmit}
        >
          <RestInputContext.Provider
            value={{
              form,
              record: currentUser,
              handleSubmit,
            }}
          >
            <Row gutter={[20, 20]}>
              <Col md={8}>
                <Card title={t('profile.personalInfo')}>
                  <ProfileForm record={currentUser} form={form} />
                </Card>
              </Col>
              {currentUser?.role === 'ARTIST' && (
                <Col md={16}>
                  <Card title={t('profile.artistInfo')}>
                    <ArtistsForm />
                  </Card>
                </Col>
              )}
              {currentUser?.role === 'GALLERY' && (
                <Col md={16}>
                  <Card title={t('profile.galleryInfo')}>
                    <Form initialValues={currentUser} form={form}>
                      {/* <ProfileForm record={currentUser} form={form} /> */}
                    </Form>
                  </Card>
                </Col>
              )}
            </Row>
          </RestInputContext.Provider>
        </Form>
        <div className="action-section">
          <Button type="primary" onClick={handleSubmit}>
            {t('button.save')}
          </Button>
          <Button onClick={() => setIsEdit(!isEdit)}>
            {t('button.cancel')}
          </Button>
        </div>
      </div>
      {/* <div className="action-section">
        <ChangePassword />
      </div> */}
    </ProfileInfoStyles>
  );
};

ProfileInfo.propTypes = {};

export default ProfileInfo;
