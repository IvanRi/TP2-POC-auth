import { Router } from "express";

function crearReservationRoute(api) {
  const router = Router();

  router.delete("/:id", (req, res) => {
    try {
      const { id } = req.params;
      const result = api.cancelReservation(id);
      return res.send(result);
    } catch (err) {
      return res.status(404).send({ error: err.message });
    }
  });

  return router;
}

export { crearReservationRoute };
