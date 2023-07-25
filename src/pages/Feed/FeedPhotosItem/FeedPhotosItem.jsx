
import { Image } from '../../../components/Image/Image';
import styles from './FeedPhotosItem.module.css';

export const FeedPhotosItem = ({ photo, setModalPhoto }) => {

  function handleClick() {
    setModalPhoto(photo);
  };

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      <span>{photo.acessos}</span>
    </li>
  );
};
