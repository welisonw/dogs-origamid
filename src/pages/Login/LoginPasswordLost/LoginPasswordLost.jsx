
import { PASSWORD_LOST } from "../../../api";
import { Button } from "../../../components/Forms/Button/Button"
import { Error } from "../../../components/Error/Error";
import { Input } from "../../../components/Forms/Input/Input"
import { Head } from "../../../components/Head/Head";
import { useFetch } from "../../../hooks/useFetch/useFetch";
import { useForm } from "../../../hooks/useForm/useForm";

export const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(e) {
    e.preventDefault();

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({ login: login.value, url: window.location.href.replace('lost', 'reset') });
  
      const { json } = await request(url, options)
    };
  };


  return (
    <section className="animeLeft">
      <Head title='Perdeu sua senha' />

      <h1 className="title">Perdeu a senha?</h1>
      {
        data ? (
          <p style={{ color: '#4c1', marginTop: '2rem', fontSize: '1.25rem' }}>{data}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <Input
              type='text'
              name='login'
              label='E-mail / Usuário'
              {...login}
            />

            { loading ? <Button disabled>Enviando...</Button> : <Button>Enviar e-mail</Button> }
          </form>
        )
      }

      <Error error={error} />
    </section>
  );
};
