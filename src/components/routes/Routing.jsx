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
      <Route element={<RequireAuth />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/bookmark" element={<BookmarkPage />} />
        <Route path="/comment" element={<CommentPage />} />
      </Route>
    </Routes>
  );
};

export { Routing };
