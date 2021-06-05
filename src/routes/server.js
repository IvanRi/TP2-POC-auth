import express from "express";
import { isAuth as auth } from "./middlewares/auth.js";
import { createPrivateRoute } from "./task/index.js";
import { createLoginRoute } from "./login/index.js";
//dao
import { crearDaoLogin } from "../db/daoLogin.js";

function createServer() {
  const app = express();

  app.use(express.json());

  const port = 3000;

  app.use("/todo", auth, createPrivateRoute());
  app.use("/login", createLoginRoute(crearDaoLogin()));

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
