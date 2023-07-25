
import { useEffect, useState } from 'react';
import { Button } from '../../../components/Forms/Button/Button';
import { Input } from '../../../components/Forms/Input/Input';
import { useForm } from '../../../hooks/useForm/useForm';
import styles from './UserPhotoPost.module.css';
import { useFetch } from '../../../hooks/useFetch/useFetch';
import { PHOTO_POST } from '../../../api';
import { Error } from '../../../components/Error/Error';
import { useNavigate } from 'react-router-dom';
import { Head } from '../../../components/Head/Head';

export const UserPhotoPost = () => {
  const name = useForm();
  const weight = useForm('number');
  const age = useForm('number');
  const [ img, setImg ] = useState({});
  const { data, loading, error, request } = useFetch();

  const navigate = useNavigate();

  useEffect(() => {
    if (data) navigate('/account')
  }, [data, navigate]);


  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append('nome', name.value);
    formData.append('peso', weight.value);
    formData.append('idade', age.value);
    formData.append('img', img.raw);
    
    const token = window.localStorage.getItem('token');
    const { url, options } = PHOTO_POST(formData, token);

    request(url, options);
  };

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }


  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title='Poste sua foto' />

      <form onSubmit={handleSubmit}>
        <Input type='text' name='name' label='Nome' {...name} />
        <Input type='number' name='weight' label='Peso' {...weight} />
        <Input type='number' name='age' label='Idade' {...age} />
        <input type="file" name="img" id="img" className={styles.file} onChange={handleImgChange} />

        { loading ? <Button disabled>Enviando...</Button> : <Button>Enviar</Button> }

        <Error error={error} />
      </form>

      <div>
        {
          img.preview && 
          <div className={styles.preview} style={{ backgroundImage: `url('${img.preview}')` }}></div>
        }
      </div>
    </section>
  );
};
