import { crearReservationRoute } from "../routes/reservationRoutes.js";
import { crearDaoReservas } from "../db/DaoReservas.js";
import { createReservationApi } from "../apis/reservationsApi.js";
import { crearEnviadorDeMails } from "../services/crearEnviadorDeMails.js";

export function reservationFactory() {
  const mail = process.env.MAIL_USER;
  const pass = process.env.MAIL_PASS;
  const dao = crearDaoReservas();
  const mailer = crearEnviadorDeMails(mail, pass);
  const api = createReservationApi(dao, mailer);
  return crearReservationRoute(api);
}
