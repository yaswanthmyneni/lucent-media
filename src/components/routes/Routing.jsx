import {
  PageNotFound,
  HomePage,
  LogoutPage,
  SignInPage,
  SignUpPage,
  ProfilePage,
  BookmarkPage,
  ExplorePage,
} from "pages";
import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import { RequireAuth } from "components";

const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<ExplorePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/mockman" element={<Mockman />} />

      <Route
        path="/home"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route
        path="/bookmark"
        element={
          <RequireAuth>
            <BookmarkPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export { Routing };
