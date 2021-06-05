const hoy = new Date();
const maniana = new Date();
maniana.setDate(maniana.getDate() + 1);
const enDosDias = new Date();
enDosDias.setDate(enDosDias.getDate() + 2);
const fechaEnTresDias = new Date();
fechaEnTresDias.setDate(fechaEnTresDias.getDate() + 3);

const reservas = [
  {
    id: 1,
    nombre: "Reserva1",
    idUsuario: 100,
    fechaHora: maniana,
    cancelada: false,
    activa: true,
  }, // llega en el mail
  {
    id: 2,
    nombre: "Reserva2",
    idUsuario: 101,
    fechaHora: maniana,
    cancelada: false,
    activa: true,
  }, // llega en el mail
  {
    id: 3,
    nombre: "Reserva3",
    idUsuario: 100,
    fechaHora: enDosDias,
    cancelada: false,
    activa: true,
  }, // llega en el mail
  {
    id: 4,
    nombre: "Reserva4",
    idUsuario: 101,
    fechaHora: enDosDias,
    cancelada: false,
    activa: true,
  }, // llega en el mail
  {
    id: 5,
    nombre: "Reserva5",
    idUsuario: 100,
    fechaHora: hoy,
    cancelada: false,
    activa: true,
  }, // no se envía
  {
    id: 6,
    nombre: "Reserva6",
    idUsuario: 101,
    fechaHora: hoy,
    cancelada: false,
    activa: true,
  }, // no se envía
  {
    id: 7,
    nombre: "Reserva7",
    idUsuario: 100,
    fechaHora: fechaEnTresDias,
    cancelada: false,
    activa: true,
  }, // no se envía
  {
    id: 8,
    nombre: "Reserva8",
    idUsuario: 101,
    fechaHora: fechaEnTresDias,
    cancelada: false,
    activa: true,
  }, // no se envía
  {
    id: 9,
    nombre: "Reserva9",
    idUsuario: 100,
    fechaHora: maniana,
    cancelada: false,
    activa: false,
  }, // no se envía
  {
    id: 10,
    nombre: "Reserva10",
    idUsuario: 101,
    fechaHora: maniana,
    cancelada: false,
    activa: false,
  }, // no se envía
];

function crearDaoReservas() {
  return {
    getReservasActivas: () => {
      return reservas.filter((r) => r.activa === true);
    },
    getReservasActivasProximas(diasLimite) {
      const reservasActivas = this.getReservasActivas();
      const reservasPorUsuario = {};
      const maniana = new Date();
      maniana.setDate(maniana.getDate() + 1);
      const fechaLimite = new Date();
      fechaLimite.setDate(fechaLimite.getDate() + diasLimite);

      for (const reserva of reservasActivas) {
        if (
          reserva.fechaHora.getDate() <= fechaLimite.getDate() &&
          reserva.fechaHora.getMonth() <= fechaLimite.getMonth() &&
          reserva.fechaHora.getFullYear() <= fechaLimite.getFullYear() &&
          reserva.fechaHora.getDate() >= maniana.getDate() &&
          reserva.fechaHora.getMonth() >= maniana.getMonth() &&
          reserva.fechaHora.getFullYear() >= maniana.getFullYear()
        ) {
          if (Array.isArray(reservasPorUsuario[reserva.idUsuario])) {
            reservasPorUsuario[reserva.idUsuario].push(reserva);
          } else {
            reservasPorUsuario[reserva.idUsuario] = [reserva];
          }
        }
      }
      return reservasPorUsuario;
    },
    cancelOneReservation: (id) => {
      const index = reservas.findIndex((reserva) => reserva.id == id);
      if (index === -1) throw new Error("Reserva inexistente");
      const updatedItem = {
        ...reservas[index],
        cancelada: true,
        activa: false,
      };
      reservas.splice(1, 1, updatedItem);
      return {
        message: "Cancelacion exitosa.",
        cancelItem: updatedItem,
      };
    },
  };
}

export { crearDaoReservas };
