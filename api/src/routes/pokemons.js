const express = require("express");
const axios = require("axios");
const { Sequelize } = require("sequelize");
const { Pokemon, Type } = require("../db.js");
const { response } = require("express");
const router = express.Router();

router.use(express.json());

let url = "https://pokeapi.co/api/v2/pokemon";

router.get("/", async (req, res) => {
    const { name } = req.query;

    console.log(name);
    if (!name) {
        try {
            const urlAll = `${url}?limit=40`;

            const responseDb = await Pokemon.findAll({ include: Type });
            const responseApi = await axios.get(urlAll);
            const dbPokemons = responseDb.map((pokemon) => {
                const obj = pokemon.dataValues;
                return {
                    ...obj,
                    types: pokemon.types.map((type) => {
                        return type.name;
                    }),
                };
            });
            const apiPokemons = responseApi.data.results;

            const resPokemons = await Promise.all(
                apiPokemons.map(async (pokemon) => {
                    const info = await axios.get(pokemon.url);

                    return {
                        id: info.data.id,
                        name: info.data.name,
                        types: info.data.types.map((t) => {
                            return t.type.name;
                        }),
                        img: info.data.sprites.other["official-artwork"]
                            .front_default,
                        attack: info.data.stats[1].base_stat,
                        dataBase: false,
                    };
                })
            );
            const finalResponse = resPokemons.concat(dbPokemons);
            console.log(finalResponse);

            res.json(finalResponse);
        } catch (error) {
            res.send(error);
        }
    } else {
        const dbInitialSearch = await Pokemon.findAll({
            where: { name: name },
            include: Type,
        });
        const dbSearch = dbInitialSearch.map((pokemon) => {
            const obj = pokemon.dataValues;
            return {
                ...obj,
                types: pokemon.types.map((type) => {
                    return type.name;
                }),
            };
        });
        try {
            const apiResponse = await axios.get(`${url}/${name}`);

            const apiPokemons = apiResponse.data;

            const transPokemon = [
                {
                    id: apiPokemons.id,
                    name: apiPokemons.name,
                    types: apiPokemons.types.map((t) => {
                        return t.type.name;
                    }),
                    img: apiPokemons.sprites.other["official-artwork"]
                        .front_default,
                    attack: apiPokemons.stats[1].base_stat,
                    dataBase: false,
                },
            ];
            const searchPokemon = transPokemon.concat(dbSearch);
            console.log(searchPokemon);
            res.json(searchPokemon);
        } catch (error) {
            if (!(dbSearch[0] == null)) {
                res.json(dbSearch);
            } else {
                res.send(["Pokemon Not Found"]);
            }
        }
    }
});

router.get("/:idPokemon", async (req, res) => {
    const { idPokemon } = req.params;
    const dbResponse = await Pokemon.findAll({
        where: { id: idPokemon },
        include: Type,
    });
    const dbPokemon = dbResponse.map((pokemon) => {
        const obj = pokemon.dataValues;
        return {
            ...obj,
            types: pokemon.types.map((type) => {
                return type.name;
            }),
        };
    });

    try {
        const response = await axios.get(`${url}/${idPokemon}`);
        const pokemonApi = response.data;
        const pokemonDetail = {
            id: pokemonApi.id,
            name: pokemonApi.name,
            types: pokemonApi.types.map((t) => {
                return t.type.name;
            }),
            img: pokemonApi.sprites.other["official-artwork"].front_default,
            hp: pokemonApi.stats[0].base_stat,
            attack: pokemonApi.stats[1].base_stat,
            defence: pokemonApi.stats[2].base_stat,
            speed: pokemonApi.stats[5].base_stat,
            height: pokemonApi.height,
            weight: pokemonApi.weight,
        };
        console.log();
        res.json(pokemonDetail);
    } catch (error) {
        if (!(dbPokemon[0] == null)) {
            res.json(dbPokemon);
        } else {
            res.send("Id Not Found");
        }
    }
});

router.post("/", async (req, res) => {
    const { name, types, img, hp, attack, defence, speed, height, weight } =
        req.body;
    console.log(img);
    const t = await Type.findAll({ where: { name: types } });
    try {
        const newPokemon = await Pokemon.create({
            name,
            img,
            hp,
            attack,
            defence,
            speed,
            height,
            weight,
        });
        res.send(await newPokemon.addTypes(t));
    } catch (error) {
        console.log("error");
        res.send(error);
    }
});

module.exports = router;
