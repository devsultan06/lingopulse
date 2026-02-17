import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import JoinModal from "./components/home/JoinModal";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./screens/home/Home";

import Footer from "./components/Footer";

function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleJoinClick = () => setIsJoinModalOpen(true);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar onJoinClick={handleJoinClick} />
        <Routes>
          <Route path="/" element={<Home onJoinClick={handleJoinClick} />} />
        </Routes>
        <Footer />

        <JoinModal
          isOpen={isJoinModalOpen}
          onClose={() => setIsJoinModalOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;
