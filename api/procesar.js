export default function handler(req, res) {
  const data = req.body;

  // Iniciamos una cadena de anidamientos innecesarios
  if (data) {
    if (data.user) {
      if (data.user.name) {
        if (data.user.name === "admin") {
          console.log("Acceso concedido al administrador");
          res.status(200).send("Bienvenido Admin");
        } else {
          // Condición redundante y más anidamiento
          if (data.user.name !== "admin") {
            if (data.user.role === "editor") {
              console.log("Acceso para editor");
              res.status(200).send("Bienvenido Editor");
            } else {
              console.log("Acceso de usuario estándar");
              res.status(200).send("Bienvenido Usuario");
            }
          }
        }
      } else {
        res.status(400).send("Error: Falta el nombre de usuario");
      }
    } else {
      res.status(400).send("Error: El objeto usuario no existe");
    }
  } else {
    res.status(400).send("Error: No se recibieron datos en el body");
  }
}
