import server from "../src/server.js";
import axios from "axios";
/* import dotenv from "dotenv";

dotenv.config(); */

(async function main() {
  await server.createServer();

  console.log("Prueba de log in usuario valido------->");
  const validBody = {
    userName: "ivan",
    pass: "1234",
  };

  try {
    const res = await axios.post(
      `http://localhost:${process.env.PORT}/login`,
      validBody
    );
    console.log("Respuesta: ", res.data);
  } catch (err) {
    console.error(err);
    console.error("-------------------");
  }

  console.log("Prueba de logueo usuario incorrecto------->");
  const invalidBody = {
    userName: "ivann",
    pass: "1234",
  };

  try {
    await axios.post(`http://localhost:3000/login`, invalidBody);
  } catch (err) {
    console.error("Respuesta: ", err.response.data);
    console.error("-------------------");
  }
})();
