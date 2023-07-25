
import { Route, Routes } from "react-router-dom"
import { UserHeader } from "../UserHeader/UserHeader"
import { Feed } from "../../Feed/Feed/Feed"
import { UserPhotoPost } from "../UserPhotoPost/UserPhotoPost"
import { UserStatistic } from "../UserStatistic/UserStatistic"
import { useContext } from "react"
import { UserContext } from "../../../contexts/UserContext/UserContext"
import { NotFound404 } from "../../NotFound404/NotFound404"
import { Head } from "../../../components/Head/Head"

export const User = () => {
  const { data } = useContext(UserContext);

  return (
    <section className="container">
      <Head title='Minha conta' />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="/upPhoto" element={<UserPhotoPost />} />
        <Route path="/statistic" element={<UserStatistic />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </section>
  );
};
