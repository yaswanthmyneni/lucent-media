import { PageNotFound, HomePage, LogoutPage, SignInPage, SignUpPage } from "pages";
import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";

const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      {/* will make home-page to private route later */}
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/mockman" element={<Mockman />} />
    </Routes>
  );
};

export { Routing };
