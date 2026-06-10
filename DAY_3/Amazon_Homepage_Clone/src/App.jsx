import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import Footer from "./components/Footer";

import products from "./data/products";

function App() {
  return (
    <>
      <Navbar />
      <Hero />

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            image={product.image}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}

export default App;