
import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch/useFetch";
import { useEffect } from "react";
import { Error } from "../../../components/Error/Error";
import { Loading } from "../../../components/Loading/Loading";
import { PhotoContent } from "../PhotoContent/PhotoContent";
import { PHOTO_GET } from "../../../api";
import { Head } from "../../../components/Head/Head";

export const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GET(id);

    request(url, options);
  }, [ request, id ]);

  if (error) return <Error error={error} />
  if (loading) return <Loading />
  if (data) {
    return (
      <section className='container mainContainer'>
        <Head title={data.photo.title} />
        <PhotoContent data={data} single={true} />
      </section>
    );
  } else return null;
};
