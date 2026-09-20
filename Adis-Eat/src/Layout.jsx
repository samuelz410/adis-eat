import { Link, NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout">
      <header className="navbar">
        <Link to="/" className="brand">☕ Addis Eats</Link>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
        </nav>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}