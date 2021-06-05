import jwt from "../services/jwt.js";

const datosGuardados = [{ user: "ivan", pass: "1234" }];

const pruebaDb = {
  getUser: (userName) =>
    datosGuardados.filter((dato) => dato.user === userName),
};

function crearDaoLogin() {
  return {
    validate: ({ userName, pass }) => {
      const [user] = pruebaDb.getUser(userName);
      if (!user || user.pass !== pass)
        return { error: "Usuario o contraseña incorrectos" };
      return { token: jwt.createToken(user) };
    },
  };
}

export { crearDaoLogin };
