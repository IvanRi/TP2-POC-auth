import dotenv from "dotenv";
import jwt from "jwt-simple";
import moment from "moment";

dotenv.config();

const SECRET = process.env.SECRET_KEY;

const createToken = async function (userData) {
  const payload = {
    sub: userData,
    iat: moment().unix(),
    exp: moment().add(14, "days").unix(),
  };
  return await jwt.encode(payload, SECRET);
};

const createCustomToken = async function (userData, iat, exp) {
  const payload = {
    sub: userData,
    iat,
    exp,
  };
  return await jwt.encode(payload, SECRET);
};

const decodeToken = async (token) => await jwt.decode(token, SECRET);

export default { createToken, decodeToken, createCustomToken };
