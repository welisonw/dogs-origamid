
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext/UserContext";
import { PhotoCommentsForm } from "../PhotoCommentsForm/PhotoCommentsForm";
import styles from './PhotoComments.module.css';
import { useRef } from "react";

export const PhotoComments = (props) => {
  const [ comments, setComments ] = useState(() => props.comments);
  const commentsSectionRef = useRef(null);
  const { login } = useContext(UserContext);

  useEffect(() => {
    commentsSectionRef.current.scrollTop = commentsSectionRef.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul className={`${styles.comments} ${props.single ? styles.single : ''}`} ref={commentsSectionRef}>
        {
          comments.map((comment) => (
            <li key={comment.comment_ID}>
              <b>{comment.comment_author}: </b>
              <span>{comment.comment_content}</span>
            </li>
          ))
        }
      </ul>

      { login && <PhotoCommentsForm id={props.id} setComments={setComments} single={props.single} /> }
    </>
  );
};
