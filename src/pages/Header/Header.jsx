
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Dogs } from '../../assets/dogs.svg'
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext/UserContext';


export const Header = () => {
  const { data } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link
          to='/'
          aria-label='Dogs - Home'
          className={styles.logo}
        >
          <Dogs />
        </Link>
        {
          data ? (
            <Link to='/account' className={styles.login}>
              {data.nome}
            </Link>
          ) : (
            <Link to='/login' className={styles.login}>
              Login / Criar
            </Link>
          )}
      </nav>
    </header>
  );
};
