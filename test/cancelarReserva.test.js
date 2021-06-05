import server from "../src/server.js";
import axios from "axios";
import { divisor } from "./testUtils.js";

(async function main() {
  await server.createServer();
  try {
    divisor("Prueba de cancelar reserva existente");
    const res = await axios.delete(
      `http://localhost:${process.env.PORT}/reservas/2`
    );
    console.log("Respuesta:", res.data);
    divisor();
  } catch (err) {
    console.log("Error:", err.response.data);
  }

  try {
    divisor("Prueba de cancelar reserva inexistente");
    await axios.delete(`http://localhost:${process.env.PORT}/reservas/22`);
  } catch (err) {
    console.log("Error:", err.response.data);
    divisor();
  }
})();
