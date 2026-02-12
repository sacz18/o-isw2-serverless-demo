export default function handler(req, res) {
  const nombre = req.query.nombre || "anónimo";

  //SIMULAR ERROR si nombre = "error" (MINI-RETO)
 /*
  if (nombre.toLowerCase() === "error") {
    return res.status(500).json({
      error: "Error simulado intencionalmente"
    });
  }
 */ 

   //AGREGAR TIMESTAMP (MINI-RETO)
  //const timestamp = new Date().toISOString();
  
  //normalmente pasa esto
  res.status(200).json({
    resultado: `Nombre procesado: ${nombre.toUpperCase()}`,
    //timestamp: timestamp
    longitud: nombre.length
  });
    
}

