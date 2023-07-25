
import { useState } from "react";

const types = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Preencha um e-mail válido',
  },
  password: {
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: `A senha precisa conter pelo menos: um número, uma letra maiúscula, uma letra minúscula, um caracter especial e oito caracteres`
  },
  number: {
    regex: /^\d+$/,
    message: 'Utilize números apenas', 
  },
};

export const useForm = (type) => {
  const [ value, setValue ] = useState('');
  const [ error, setError ] = useState(null);

  function validate(value) {
    if (type === false) return true;

    if (value.length === 0) {
      setError('Preencha um valor');
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    };
  };

  function onChange(e) {
    if (error) validate(e.target.value);

    setValue(e.target.value);
  };


  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};
