import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateWebToken = (id) => {
  const token = jwt.sign({ id, expiresIn: "7d" }, process.env.jwt_secret);
  return token;
};

export default generateWebToken;
