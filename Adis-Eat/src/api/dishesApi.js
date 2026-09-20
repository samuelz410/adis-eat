export async function fetchDishes(category, signal) {
  const res = await fetch("/dishes.json", { signal });
  if (!res.ok) {
    throw new Error(`Failed to load dishes (Status: ${res.status})`);
  }
  const data = await res.json();
  if (category && category !== "All") {
    return data.filter((d) => d.category === category);
  }
  return data;
}

export const categories = ["All", "Breakfast", "Mains", "Drinks"];