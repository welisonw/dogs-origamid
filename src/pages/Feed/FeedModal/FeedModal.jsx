
import { useEffect } from 'react';
import { useFetch } from '../../../hooks/useFetch/useFetch';
import styles from './FeedModal.module.css';
import { PHOTO_GET } from '../../../api';
import { Error } from '../../../components/Error/Error';
import { Loading } from '../../../components/Loading/Loading';
import { PhotoContent } from '../../Photo/PhotoContent/PhotoContent';

export const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, loading, error, request } = useFetch();

  function handleOutsideModal(e) {
    if (e.target === e.currentTarget || e.key === 'Escape') {
      setModalPhoto(null);
    };
  };

  useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);

    request(url, options);
  }, [photo, request]);


  useEffect(() => {
    document.addEventListener('keydown', handleOutsideModal);

    return () => {
      window.removeEventListener('keydown', handleOutsideModal);
    };
  }, []);


  return (
    <div className={styles.modal} onClick={handleOutsideModal}>
      { error && <Error error={error} /> }
      { loading && <Loading /> }
      { data && <PhotoContent data={data} /> }
    </div>
  );
};
