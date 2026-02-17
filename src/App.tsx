import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./screens/home/Home";

import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
  
        </Routes>
        <Footer />{" "}
      </div>
    </Router>
  );
}

export default App;
