
import { Link } from 'react-router-dom';
import { PhotoComments } from '../PhotoComments/PhotoComments';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext/UserContext';
import { PhotoDelete } from '../PhotoDelete/PhotoDelete';
import { Image } from '../../../components/Image/Image';
import styles from './PhotoContent.module.css';

export const PhotoContent = ({ data, single }) => {
  const user = useContext(UserContext);
  const { photo, comments } = data;


  return (
    <div className={`${styles.photo} ${single ? styles.single : ''}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>

      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {/* se vai mostrar o botão delete, caso a foto for do usuário ou @ do usuário que postou */}
            {
              user.data && 
              user.data.username === photo.author ? (
                <PhotoDelete id={photo.id} /> 
              ) : (
                <Link to={`/profile/${photo.author}`}>@{photo.author}</Link>
              )
            }

            <span>{photo.acessos}</span>
          </p>
          <h1 className='title'>
            <Link to={`/photo/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} {photo.idade == 1 ? ' ano' : ' anos'}</li>
          </ul>
        </div>

      </div>

      <PhotoComments id={photo.id} comments={comments} single={single} />
    </div>
  );
};
