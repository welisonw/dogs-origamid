/* eslint-disable no-extra-semi */

import { useState } from "react";
import { ReactComponent as Enviar } from "../../../assets/enviar.svg";
import { useFetch } from "../../../hooks/useFetch/useFetch";
import { COMMENT_POST } from "../../../api";
import { Error } from "../../../components/Error/Error";
import styles from './PhotoCommentsForm.module.css';


export const PhotoCommentsForm = ({ id, setComments, single }) => {
  const [ comment, setComment ] = useState('');
  const { error, request } = useFetch();


  async function handleSubmit(e) {
    e.preventDefault();

    const { url, options } = COMMENT_POST(id, { comment });

    const { response, json } = await request(url, options);

    if (response.ok) {
      setComment('');
      setComments((prevState) => [ ...prevState, json ]);
    };
  };


  return (
    <form className={`${styles.form} ${single ? styles.single : ''}`} onSubmit={handleSubmit}>
      <textarea
        name="comment"
        id="comment"
        placeholder="Comente aqui..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className={styles.textarea}
      ></textarea>

      <button className={styles.button}><Enviar /></button>

      <Error error={error} />
    </form>
  );
};
