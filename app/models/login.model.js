module.exports = mongoose => {
  const Login = mongoose.model(
    "login",
    mongoose.Schema(
      {
        user_name: String,
        password: String
      },
      { timestamps: true }
    )
  );

  return Login;
};