import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/procesar.js";

test("procesar convierte el nombre a mayúsculas", () => {
  const req = { query: { nombre: "juan" } };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, { resultado: "Nombre procesado: JUAN", longitud: 4 });
});

test("procesar maneja nombre ausente", () => {
  const req = { query: {} };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  handler(req, res);

  assert.equal(res.statusCode, 200);
  assert.ok(res.body.resultado.includes("ANÓNIMO"));
});

test("calidad: formato consistente - siempre 'Nombre procesado: X'", () => {
  const casos = [
    { query: { nombre: "ana" }, esperado: "Nombre procesado: ANA" },
    { query: { nombre: "PEDRO" }, esperado: "Nombre procesado: PEDRO" },
    { query: { nombre: "" }, esperado: "Nombre procesado: ANÓNIMO" },
    { query: {}, esperado: "Nombre procesado: ANÓNIMO" }
  ];

  casos.forEach(({ query, esperado }) => {
    const req = { query };
    const res = {
      statusCode: null,
      body: null,
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(payload) {
        this.body = payload;
        return this;
      }
    };

    handler(req, res);
    
    // Regla de calidad: El formato SIEMPRE es "Nombre procesado: VALOR"
    assert.equal(res.body.resultado, esperado);
    assert.match(res.body.resultado, /^Nombre procesado: [A-ZÁÉÍÓÚÑ]+!?$/, 
      "Formato debe ser 'Nombre procesado: TEXTO'");
  });
});
