import {
  PageNotFound,
  HomePage,
  LogoutPage,
  SignInPage,
  SignUpPage,
  ProfilePage,
  BookmarkPage,
  ExplorePage,
  CommentPage,
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

      {/* Private Routes */}
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
      <Route
        path="/comment"
        element={
          <RequireAuth>
            <CommentPage />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export { Routing };
