import { useCartStore } from "../cart/useCartStore";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, removeItem, clearCart } = useCartStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div>
        <h2>Your Cart is Empty</h2>
        <Link to="/menu">Explore Menu</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id} style={{ marginBottom: "0.5rem" }}>
            <strong>{item.name}</strong> x {item.qty} — {item.price * item.qty} ETB{" "}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: {total.toFixed(2)} ETB</h3>
      <button onClick={clearCart}>Clear Cart</button>{" "}
      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
}