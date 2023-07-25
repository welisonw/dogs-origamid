
import { Head } from "../../components/Head/Head";

export const NotFound404 = () => {
  return (
    <div className="container mainContainer">
      <Head title='Error 404: Página não encontrada' />

      <h1 className="title">Error: 404</h1>
      <p>Página não encontrada.</p>
    </div>
  );
};
