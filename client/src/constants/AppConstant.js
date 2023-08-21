const BASE_URL = () => {
  return process.env.NODE_ENV === "production"
    ? "https://wallet-system-high-level-ca2da79447b7.herokuapp.com/api"
    : "http://localhost:8000/api";
};

export { BASE_URL };
