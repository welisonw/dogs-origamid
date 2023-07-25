
import { Head } from "../../components/Head/Head";
import { Feed } from "../Feed/Feed/Feed";

export const Home = () => {
  return (
    <section className="container mainContainer">
      <Head title='Fotos' description='Home do site Dogs, com o feed de fotos' />
      <Feed />
    </section>
  );
};
