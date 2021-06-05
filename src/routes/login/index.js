import { Router } from "express";

function createLoginRoute(daoLogin) {
  const router = Router();

  router.post("/", (req, res) => {
    const { userName, pass } = req.body;
    try {
      const user = daoLogin.validate({ userName, pass });
      if (user.error) return res.status(403).send({ error: user.error });
      return res.send({ token: user.token });
    } catch (err) {
      return res
        .status(400)
        .send({ message: "Error al acceder al recurso: ", err });
    }
  });

  return router;
}

export { createLoginRoute };
