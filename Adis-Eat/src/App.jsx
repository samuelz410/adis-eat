import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<h2>Welcome to Addis Eats</h2>} />
          <Route path="menu" element={<h2>Menu Screen</h2>} />
          <Route path="cart" element={<h2>Cart Screen</h2>} />
          <Route path="checkout" element={<h2>Checkout Screen</h2>} />
          <Route path="*" element={<h2>404 Page Not Found</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}