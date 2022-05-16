import { Footer, Header } from "components";
import { HomePage } from "pages";
import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mockman" element={<Mockman />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
