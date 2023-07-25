
import { Suspense, lazy, useEffect } from "react";
import { Head } from "../../../components/Head/Head";
import { useFetch } from "../../../hooks/useFetch/useFetch";
import { STATS_GET } from "../../../api";
import { Error } from "../../../components/Error/Error";
import { Loading } from "../../../components/Loading/Loading";
import {  } from "react";
const UserStatisticGraphs = lazy(() => import('../UserStatisticGraphs/UserStatisticGraphs'));

export const UserStatistic = () => {
  const { data, loading, error, request } = useFetch();


  useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();

      await request(url, options);
    };

    getData();
  }, [request]);

  if (error) return <Error error={error} />
  if (loading) return <Loading />
  if (data) {
    return (
      <Suspense fallback={<Loading />}>
        <Head title='Estatísticas' />
        <UserStatisticGraphs data={data} />
      </Suspense>
    );
  } else return null;
};
