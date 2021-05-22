import server from "../src/routes/server.js";
import jwt from "../src/services/jwt.js";
import axios from "axios";
import moment from "moment";

(async function main() {
  await server.createServer();

  const validToken = jwt.createToken({ name: "ivan" });
  const expiredToken = jwt.createCustomToken(
    null,
    moment().subtract(2, "days").unix(),
    moment().subtract(1, "days").unix()
  );

  console.log("Prueba con token valido------->");
  try {
    const { data } = await axios.get(`http://localhost:3000/todo`, {
      headers: { authorization: validToken },
    });
    console.log(data);
    console.error("-------------------");
  } catch (err) {
    console.error("SUCCES RESPONSE WITH ERROR: ", err);
  }

  console.log("Prueba sin token------->");
  try {
    await axios.get(`http://localhost:3000/todo`);
  } catch (err) {
    console.error(err.response.data);
    console.error("-------------------");
  }

  console.log("Prueba con token invalido------->");
  try {
    await axios.get(`http://localhost:3000/todo`, {
      headers: { authorization: "invalid.token" },
    });
  } catch (err) {
    console.error(err.response.data);
    console.error("-------------------");
  }

  console.log("Prueba con token expirado------->");
  try {
    await axios.get(`http://localhost:3000/todo`, {
      headers: { authorization: expiredToken },
    });
  } catch (err) {
    console.error(err.response.data);
    console.error("-------------------");
  }
})();
