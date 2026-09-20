import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDishes } from "../api/dishesApi";

export default function DishDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    fetchDishes("All").then((data) => {
      const found = data.find((item) => item.id === Number(id));
      setDish(found);
    });
  }, [id]);

  if (!dish) return <p>Loading dish details...</p>;

  return (
    <div className="dish-detail">
      <button onClick={() => navigate(-1)}>← Back</button>
      <h2>{dish.name} {dish.spicy && "🌶️"}</h2>
      <p>Category: {dish.category}</p>
      <p>Price: {dish.price} ETB</p>
    </div>
  );
}