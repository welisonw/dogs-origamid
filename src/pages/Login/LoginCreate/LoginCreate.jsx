
import { useContext } from "react";
import { USER_POST } from "../../../api";
import { Button } from "../../../components/Forms/Button/Button";
import { Input } from "../../../components/Forms/Input/Input";
import { useForm } from "../../../hooks/useForm/useForm";
import { useFetch } from "../../../hooks/useFetch/useFetch";
import { UserContext } from "../../../contexts/UserContext/UserContext";
import { Error } from "../../../components/Error/Error";
import { Head } from "../../../components/Head/Head";

export const LoginCreate = () => {
  const username = useForm();
  const email = useForm('email');
  const password = useForm('password');
  const { userLogin } = useContext(UserContext);
  const { error, loading, request } = useFetch();
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    
    const { response } = await request(url, options);

    if (response.ok) userLogin(username.value, password.value);
  };

  return (
    <section className="animeLeft">
      <Head title='Criar conta' />

      <h1 className="title">Cadastre-se</h1>

      <form onSubmit={handleSubmit}>
        <Input
          type='text'
          name='username'
          label='Usuário'
          {...username}
        />
        
        <Input
          type='email'
          name='email'
          label='E-mail'
          {...email}
        />
        
        <Input
          type='password'
          name='password'
          label='Senha'
          {...password}
        />

        { loading ? <Button disabled>Cadastrando...</Button> : <Button>Cadastrar</Button> }
        
        <Error error={error} />
      </form>
    </section>
  );
};
