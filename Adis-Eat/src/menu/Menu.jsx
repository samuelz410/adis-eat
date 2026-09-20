import { useState, useEffect } from "react";
import { fetchDishes } from "../api/dishesApi";

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchDishes("All", controller.signal)
      .then((data) => {
        setDishes(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  if (loading) return <div>⏳ Loading dishes...</div>;
  if (error) return <div>⚠️ Error: {error}</div>;

  return (
    <div>
      <h2>Menu</h2>
      <div className="dish-grid">
        {dishes.map((dish) => (
          <div key={dish.id} className="dish-card">
            <h3>{dish.name} {dish.spicy && "🌶️"}</h3>
            <p>{dish.price} ETB</p>
          </div>
        ))}
      </div>
    </div>
  );
}