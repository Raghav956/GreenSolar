import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ComplaintPage from "./pages/ComplaintPage";
import AdminPage from "./pages/AdminPage";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import Calculator from "./pages/Calculator";
import Projects from "./pages/Projects";
import AdminLogin from "./pages/AdminLogin";
import ProjectDetail from "./pages/ProjectDetail";
import WhatsAppButton from "./components/WhatsAppButton";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./components/ScrollToTop";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>
  <ScrollToTop />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/complaints"
          element={<ComplaintPage />}
        />

      <Route
  path="/admin"
  element={
    <ProtectedRoute>

      <AdminPage />

    </ProtectedRoute>
  }
/>

<Route
  path="/admin/login"
  element={<AdminLogin />}
/>

        <Route
  path="/projects"
  element={<Projects />}
/>
<Route
  path="/projects/:id"
  element={<ProjectDetail />}
/>

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/testimonials"
          element={<Testimonials />}
        />

        <Route
          path="/calculator"
          element={<Calculator />}
        />

      </Routes>
      
  <WhatsAppButton />
  <Toaster
  position="top-right"
/>
    </BrowserRouter>
  );
}

export default App;