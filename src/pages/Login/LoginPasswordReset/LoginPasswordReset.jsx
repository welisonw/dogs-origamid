
import { useEffect, useState } from "react"
import { Input } from "../../../components/Forms/Input/Input";
import { Button } from "../../../components/Forms/Button/Button";
import { useForm } from "../../../hooks/useForm/useForm";
import { PASSWORD_RESET } from "../../../api";
import { useFetch } from "../../../hooks/useFetch/useFetch";
import { Error } from "../../../components/Error/Error";
import { useNavigate } from "react-router-dom";
import { Head } from "../../../components/Head/Head";

export const LoginPasswordReset = () => {
  const [ login, setLogin ] = useState('');
  const [ key, setKey ] = useState('');
  const password = useForm('password');
  const { loading, error, request } = useFetch();
  const navigate = useNavigate();
  

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');

    if (key) setKey(key);

    if (login) setLogin(login);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (password.validate()){
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });
  
      const { response } = await request(url, options);
  
      if (response.ok) navigate('/login');
    };
  };


  return (
    <section className="animeLeft">
      <Head title='Redefinir senha' />

      <h1 className="title">Redefinir a senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type='password'
          name='password'
          label='Nova senha'
          {...password}
        />

        { loading ? <Button disabled>Redefinindo...</Button> : <Button>Definir nova senha</Button> }
      </form>

      <Error error={error} />
    </section>
  );
};
