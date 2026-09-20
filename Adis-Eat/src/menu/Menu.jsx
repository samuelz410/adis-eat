import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { fetchDishes, categories } from "../api/dishesApi";

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetchDishes(activeCategory, controller.signal)
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
  }, [activeCategory]);

  return (
    <div>
      <h2>Menu</h2>
      <div className="category-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={activeCategory === cat ? "active" : ""}
            onClick={() => setSearchParams(cat === "All" ? {} : { category: cat })}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p>⏳ Loading...</p>}
      {error && <p>⚠️ Error: {error}</p>}

      {!loading && !error && (
        <div className="dish-grid">
          {dishes.map((dish) => (
            <div key={dish.id} className="dish-card">
              <h3>{dish.name}</h3>
              <p>{dish.price} ETB</p>
              <Link to={`/menu/${dish.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}