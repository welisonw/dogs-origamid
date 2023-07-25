
import { useContext } from "react";
import { Link } from "react-router-dom"
import { Input } from "../../../components/Forms/Input/Input";
import { Button } from "../../../components/Forms/Button/Button";
import { useForm } from "../../../hooks/useForm/useForm";
import { UserContext } from "../../../contexts/UserContext/UserContext";
import { Error } from "../../../components/Error/Error";
import { Head } from "../../../components/Head/Head";
import styles from '../LoginForm/LoginForm.module.css';
import stylesBtn from '../../../components/Forms/Button/Button.module.css';


export const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, loading, error } = useContext(UserContext);


  async function handleSubmit(e) {
    e.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    };
  };


  return (
    <section className='animeLeft'>
      <Head title='Login' />

      <h1 className="title">Login</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label='Usuário'
          type='text'
          name='username'
          {...username}
        />

        <Input
          label='Senha'
          type='password'
          name='password'
          {...password}
        />

        { loading ? <Button disabled>Carregando...</Button> : <Button>Entrar</Button> }

        <Error error={error && 'Dados incorretos.'} />
      </form>
      
      <Link to='/login/password-lost' className={styles.passwordLost}>Esqueceu a senha?</Link>

      <div className={styles.createAccount}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se agora.</p>
        <Link to='/login/create' className={stylesBtn.button}>Cadastro</Link>
      </div>
    </section>
  );
};
