export default function ProductCard({
  title,
  image,
}) {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </div>
  );
}