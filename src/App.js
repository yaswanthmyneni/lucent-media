import { Footer, Header, Routing } from "components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <Routing />
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
