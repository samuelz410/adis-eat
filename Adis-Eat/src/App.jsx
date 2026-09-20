import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import { ErrorBoundary } from "./ui/ErrorBoundary";
import RequireAuth from "./auth/RequireAuth";

import Layout from "./Layout";
import Menu from "./menu/Menu";
import DishDetail from "./menu/DishDetail";

const Checkout = lazy(() => import("./checkout/Checkout"));

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<h2>Welcome to Addis Eats</h2>} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/:id" element={<DishDetail />} />
              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <Suspense fallback={<div>Loading checkout...</div>}>
                      <Checkout />
                    </Suspense>
                  </RequireAuth>
                }
              />
              <Route path="*" element={<h2>404 Not Found</h2>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}