import { AsideBarBottom, Footer, Header, Routing } from "components";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <Routing />
      <Footer />
      <ToastContainer />
      {(pathname !== "/signin" &&
        pathname !== "/signup" &&
        pathname !== "/logout") && <AsideBarBottom />}
    </>
  );
}

export default App;
