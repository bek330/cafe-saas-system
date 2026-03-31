function CategoryCard({ category, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        height: "120px",
        borderRadius: "12px",
        backgroundImage: `url(${category.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "18px",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* dark overlay */}
      <div />

      {/* text */}
      <span>{category.name}</span>
    </div>
  );
}

export default CategoryCard;
