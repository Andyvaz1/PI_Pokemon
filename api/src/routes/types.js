const express = require("express");
const axios = require("axios");
const { Sequelize } = require("sequelize");
const router = express.Router();
const { Pokemon, Type } = require("../db.js");

const urlTypes = "https://pokeapi.co/api/v2/type";

//////////////PRE-LOAD TYPES de la API a la DB/////////////

let preload = async () => {
    let responseApi = await axios.get(urlTypes);
    let typesApi = responseApi.data.results;
    let preloadT = await Promise.all(
        typesApi.map(async (t) => {
            await Type.create({ name: t.name });
        })
    );
};


preload();







router.get("/", async (req, res) => {
    try {
        const dbTypes = await Type.findAll();
        res.json(dbTypes);
    } catch (error) {
        console.log(error);
    }
});

router.use(express.json());

module.exports = router;
