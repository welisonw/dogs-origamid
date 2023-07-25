
import { Header } from "./pages/Header/Header";
import { Home } from "./pages/Home/Home";
import { Footer } from "./pages/Footer/Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from "./pages/Login/Login/Login";
import { UserStorage } from "./contexts/UserContext/UserContext";
import { User } from "./pages/User/User/User";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Photo } from "./pages/Photo/Photo/Photo";
import { UserProfile } from "./pages/User/UserProfile/UserProfile";
import { NotFound404 } from "./pages/NotFound404/NotFound404";


const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className="AppBody">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login/*" element={<Login />} />
              <Route
                path="/account/*"
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>}
              />
              <Route path="/photo/:id" element={<Photo />} />
              <Route path="/profile/:user" element={<UserProfile />} />
              <Route path="*" element={<NotFound404 />} />
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
};

export default App;
