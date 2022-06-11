import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Call from "./pages/call";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/app" element={<Call />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
