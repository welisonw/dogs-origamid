
import { useParams } from 'react-router-dom';
import { Feed } from '../../Feed/Feed/Feed';
import { Head } from '../../../components/Head/Head';

export const UserProfile = () => {
  const { user } = useParams();

  return (
    <section className='container mainContainer'>
      <Head title={user} />
      <h1 className='title'>{user}</h1>
      <Feed user={user} />
    </section>
  );
};
