
import { createContext, useCallback, useEffect, useState } from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "../../api";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [ data, setData ] = useState(null);
  const [ login, setLogin ] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const navigate = useNavigate();


  const userLogout = useCallback(async function () {
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem('token');
  }, []);

  async function getUser(token) {
    const { url, options } = USER_GET(token);

    const response = await fetch(url, options);
    const data = await response.json();

    setData(data);
    setLogin(true);
  };

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = TOKEN_POST({ username, password });
  
      const response = await fetch(url, options);

      if (!response.ok) throw new Error(`Erro: Usuário ou senha inválidos.`)

      const { token } = await response.json();
  
      window.localStorage.setItem('token', token);
  
      await getUser(token);

      navigate('/account');
    } catch (error) {
      setError(error.message);
      setLogin(false);      
    } finally {
      setLoading(false);
    };
  };

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');

      if (token) {
        try {
          setError(null);
          setLoading(true);

          const { url, options } = TOKEN_VALIDATE_POST(token);
  
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
        
          await getUser(token);
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        };
      } else {
        setLoading(false);
      };
    };

    autoLogin();
  }, [userLogout]);


  return (
    <UserContext.Provider value={{ data, login, loading, error, userLogin, userLogout }}>
      {children}
    </UserContext.Provider>
  );
};
