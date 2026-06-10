import { useEffect, useState } from "react";

const products = [
  "iPhone 15",
  "Samsung Galaxy S24",
  "MacBook Air",
  "Dell XPS",
  "Sony Headphones",
  "Apple Watch",
  "OnePlus 12",
  "iPad Pro",
  "Canon Camera",
  "HP Laptop",
];

export default function SearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue, setDebouncedValue] =
    useState("");
  const [filteredItems, setFilteredItems] =
    useState(products);

  // Debounce Logic (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter after debounce
  useEffect(() => {
    const filtered = products.filter((item) =>
      item
        .toLowerCase()
        .includes(debouncedValue.toLowerCase())
    );

    setFilteredItems(filtered);
  }, [debouncedValue]);

  return (
    <div className="container">
      <h1>Product Search</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />

      <div className="results">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={index} className="card">
              {item}
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}