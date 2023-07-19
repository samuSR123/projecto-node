module.exports = mongoose => {
  const Product = mongoose.model(
    "product",
    mongoose.Schema(
      {
        name: String,
        description: String,
        kcal: String,
        available: Boolean,
        price: String
      },
      { timestamps: true }
    )
  );
          
  return Product;
};