
import { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { UserContext } from "../../../contexts/UserContext/UserContext";
import { ReactComponent as MinhasFotos } from "../../../assets/feed.svg";
import { ReactComponent as Estatisticas } from "../../../assets/estatisticas.svg";
import { ReactComponent as AdicionarFoto } from "../../../assets/adicionar.svg";
import { ReactComponent as Sair } from "../../../assets/sair.svg";
import styles from './UserHeaderNav.module.css';
import { useMedia } from "../../../hooks/useMedia/useMedia";

export const UserHeaderNav = () => {
  const mobile = useMedia('(max-width: 40rem)');
  const { userLogout } = useContext(UserContext);
  const [ mobileMenu, setMobileMenu ] = useState(false);
  const navigate = useNavigate();

  const { pathname } = useLocation();

  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  function handleLogout() {
    userLogout();
    navigate('/login');
  };


  return (
    <>
      { 
        mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileBtn} ${mobileMenu && styles.mobileBtnActive}`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
        )
      }

      <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
        <NavLink to='/account' end><MinhasFotos />{mobile && 'Minhas fotos'}</NavLink>
        <NavLink to='/account/statistic'><Estatisticas />{mobile && 'Estatísticas'}</NavLink>
        <NavLink to='/account/upPhoto'><AdicionarFoto />{mobile && 'Adicionar Foto'}</NavLink>
        <button onClick={handleLogout}><Sair />{mobile && 'Sair'}</button>
      </nav>
    </>
  );
};
