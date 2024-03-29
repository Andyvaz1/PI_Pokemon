const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const pokemonsRouter = require("./pokemons.js");
const typesRouter = require("./types.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", pokemonsRouter);
router.use("/types", typesRouter);

module.exports = router;
