import express from "express";
import { isAuth as auth } from "./middlewares/auth.js";
import { createPrivateRoute } from "./routes/taskRoutes.js";
import { createLoginRoute } from "./routes/loginRoutes.js";
import { crearReservationRoute } from "./routes/reservationRoutes.js";
//dao
import { crearDaoLogin } from "./db/daoLogin.js";
import { crearDaoReservas } from "./db/DaoReservas.js";
import dotenv from "dotenv";
//API
import { createReservationApi } from "./apis/reservationsApi.js";
//factorys
import { reservationFactory } from "./factorys/reservationFactory.js";

dotenv.config();

function createServer() {
  const app = express();

  app.use(express.json());

  const port = process.env.PORT;

  app.use("/todo", auth, createPrivateRoute());
  app.use("/login", createLoginRoute(crearDaoLogin()));
  app.use("/reservas", reservationFactory());

  return new Promise((resolve, reject) => {
    const server = app
      .listen(port)
      .once("error", () => {
        reject(new Error("Error de conexion servidor."));
      })
      .once("listening", () => {
        server.port = server.address().port;
        console.log("Listen in port: ", port);
        resolve(server);
      });
  });
}

export default { createServer };
