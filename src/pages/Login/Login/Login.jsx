
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginForm } from "../LoginForm/LoginForm";
import { LoginCreate } from "../LoginCreate/LoginCreate";
import { LoginPasswordLost } from '../LoginPasswordLost/LoginPasswordLost';
import { LoginPasswordReset } from '../LoginPasswordReset/LoginPasswordReset';
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext/UserContext";
import { NotFound404 } from "../../NotFound404/NotFound404";
import styles from '../Login/Login.module.css';

export const Login = () => {
  const { login } = useContext(UserContext);
  
  // verificar se o usuário está logado
  if (login === true) return <Navigate to='/account' />;

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/create" element={<LoginCreate />} />
          <Route path="/password-lost" element={<LoginPasswordLost />} />
          <Route path="/password-reset" element={<LoginPasswordReset />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </section>
  );
};
