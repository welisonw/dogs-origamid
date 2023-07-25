
import { useEffect, useState } from "react";
import { UserHeaderNav } from "../UserHeaderNav/UserHeaderNav";
import styles from './UserHeader.module.css';
import { useLocation } from "react-router-dom";


export const UserHeader = () => {
  const [ title, setTitle ] = useState('');
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/account':
        setTitle('Minha conta');
        break;
      case '/account/statistic':
        setTitle('Estatísticas');
        break;
      case '/account/upPhoto':
        setTitle('Poste Sua Foto');
        break;
      default:
        break;
    };
  }, [location]);
  
  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};
