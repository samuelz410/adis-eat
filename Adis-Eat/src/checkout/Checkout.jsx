import { useState } from "react";
import { useCartStore } from "../cart/useCartStore";

export default function Checkout() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [form, setForm] = useState({ name: "", phone: "", area: "" });
  const [submitted, setSubmitted] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const isPhoneValid = /^(09|07)\d{8}$/.test(form.phone.trim());
  const isFormValid = form.name.trim() !== "" && form.area.trim() !== "" && isPhoneValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitted(true);
    clearCart();
  };

  if (submitted) return <h2>🎉 Order Placed! Thank you, {form.name}.</h2>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout ({cartTotal.toFixed(2)} ETB)</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="TeleBirr Phone (09... or 07...)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <input
        type="text"
        placeholder="Delivery Area"
        value={form.area}
        onChange={(e) => setForm({ ...form, area: e.target.value })}
      />
      <button type="submit" disabled={!isFormValid || cartTotal === 0}>
        Place Order
      </button>
    </form>
  );
}