import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useAuth } from "./contexts/AuthContext";
import "./styles/global.css";
import ForgetPassword from "./page/ForgetPassword";
import { Offline, Online } from "react-detect-offline";
import { useRecoilState } from "recoil";
import { darkModeState } from "./atoms/modalAtom";
import { useSelector } from "react-redux";
import AlertComponent from "./UI/Alert";
import MediaQuery from "react-responsive";
import MobileBottomNavigation from "./components/MobileBottomNavigation";
import TransitionsModal from "./components/ModalPage";
import Signup from "./page/Signup";
import Login from "./page/Login";

const Home = React.lazy(() => import("./page/Home"));
const Profile = React.lazy(() => import("./page/Profile"));
const Bookmarks = React.lazy(() => import("./page/Bookmarks"));
const Messages = React.lazy(() => import("./page/Messages"));
const PostPage = React.lazy(() => import("./page/PostPage"));

function App() {
  const { currentUser } = useAuth();
  const [darkTheme, setDarkTheme] = useRecoilState(darkModeState);
  const modal = useSelector((state) => state.modal.showModal);

  return (
    <div className={darkTheme ? "dark" : ""}>
      <Offline className="min-w-screen h-screen bg-black text-white flex justify-center items-center">
        <div className="w-screen h-screen text-white flex justify-center items-center flex-col text-2xl">
          <h1>You are offline!</h1>
          <img
            alt="logo"
            src="/assets/Error Naughty Dog.svg"
            className="w-80 h-80"
          />
          <p>
            it seems there is a problem with your connection. Please check your
            network status
          </p>
        </div>
      </Offline>
      <Online>
        <Routes>
          <Route
            path="/login"
            element={!currentUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!currentUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/:id"
            element={
              <Suspense
                fallback={
                  <div className="flex justify-center items-center">
                    <ClipLoader color="#1DA1F2" />
                  </div>
                }
              >
                {currentUser ? <PostPage /> : <Navigate to="/login" />}
              </Suspense>
            }
          />

          <Route path="/resetpassword" element={<ForgetPassword />} />

          <Route
            path="/profile/:id"
            element={
              <Suspense
                fallback={
                  <div className="flex justify-center items-center">
                    <ClipLoader color="#1DA1F2" />
                  </div>
                }
              >
                {currentUser ? <Profile /> : <Navigate to="/login" />}
              </Suspense>
            }
          />
          <Route path="/resetpassword" element={<ForgetPassword />} />
          <Route
            path="/messages/:id"
            element={
              <Suspense>
                <Messages />
              </Suspense>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <Suspense>
                <Bookmarks />
              </Suspense>
            }
          />

          <Route
            path="*"
            element={
              <Suspense
                fallback={
                  <div className="flex justify-center items-center">
                    <ClipLoader color="#1DA1F2" />
                  </div>
                }
              >
                {currentUser ? <Home /> : <Navigate to="/login" />}
              </Suspense>
            }
          />
        </Routes>
      </Online>

      <MediaQuery maxWidth={700}>
        <MobileBottomNavigation />
      </MediaQuery>

      <AlertComponent />
      {modal && <TransitionsModal />}
    </div>
  );
}

export default App;
// import Signup from "./page/Signup";
// import Profile from "./page/Profile";
// import Bookmarks from "./page/Bookmarks";
// import Messages from "./page/Messages";
// import MobileBottomNavigation from "./components/MobileBottomNavigation";
// import TransitionsModal from "./components/ModalPage";
