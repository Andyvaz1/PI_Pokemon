import axios from "axios";

////////VARIABLES PARA LAS ACCIONES////////

export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const GET_ALL_TYPES = "GET_ALL_TYPES";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const SEARCH_POKEMON = "SEARCH_POKEMON";
export const FILTER_TYPE = "FILTER_TYPE";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const FILTER_ALPHA_AZ = "FILTER_ALPHA_AZ";
export const FILTER_ALPHA_ZA = "FILTER_ALPHA_ZA";
export const FILTER_ATTACK_ASC = "FILTER_ATTACK_ASC";
export const FILTER_ATTACK_DESC = "FILTER_ATTACK_DESC";
export const NOT_FOUND = "NOT_FOUND";

//////////////ACTION CREATORS//////////////////

//////////////TRAER TODOS LOS POKEMONS///////////////

export const getAllPokemons = () => {
    return async function (dispatch) {
        return fetch("http://localhost:3001/pokemons")
            .then((response) => response.json())
            .then((json) => dispatch({ type: GET_ALL_POKEMONS, payload: json }))
            .catch((error) => console.log(error));
    };
};

///////////////TRAER DETALLE DE POKEMON/////////////////

export const getPokemonDetail = (id) => {
    return async function (dispatch) {
        return fetch(`http://localhost:3001/pokemons/${id}`)
            .then((response) => response.json())
            .then((json) =>
                dispatch({ type: GET_POKEMON_DETAIL, payload: json })
            )
            .catch((error) => console.log(error));
    };
};

//////////////////TRAER TODOS LOS TIPOS ////////////////

export const getAllTypes = () => {
    return async function (dispatch) {
        return fetch("http://localhost:3001/types")
            .then((response) => response.json())
            .then((json) => dispatch({ type: GET_ALL_TYPES, payload: json }))
            .catch((error) => console.log(error));
    };
};

///////////CREAR POKEMON//////////////////
export const createPokemon = (newPokemon) => {
    return async function (dispatch) {
        return axios
            .post("http://localhost:3001/pokemons", {
                name: newPokemon.name,
                types: newPokemon.types,
                img: newPokemon.img,
                hp: newPokemon.hp,
                attack: newPokemon.attack,
                defence: newPokemon.defence,
                speed: newPokemon.speed,
                height: newPokemon.height * 0.393701, //paso de cm a inch //
                weight: newPokemon.weight * 2.2, //paso de kg a pound //
            })
            .then((json) =>
                dispatch({ type: CREATE_POKEMON, payload: json.data })
            )
            .catch((error) => console.log(error));
    };
};

////////BUSCAR POKEMON///////////

export const searchPokemon = (name) => {
    return async function (dispatch) {
        return fetch(`http://localhost:3001/pokemons?name=${name}`)
            .then((response) => response.json())
            .then((json) => dispatch({ type: GET_ALL_POKEMONS, payload: json }))
            .catch((error) => dispatch({ type: NOT_FOUND, payload: error }));
    };
};

////////FILTRO TYPE//////////

export const filterType = (type) => {
    return {
        type: FILTER_TYPE,
        t: type,
    };
};

//////FILTRO CREATED/////////

export const filterOrigin = (dB) => {
    return {
        type: FILTER_ORIGIN,
        payload: dB,
    };
};

////Ordenar por: //////////////

export function filterAlphaAZ() {
    return {
        type: FILTER_ALPHA_AZ,
    };
}

export function filterAlphaZA() {
    return {
        type: FILTER_ALPHA_ZA,
    };
}

export function filterAttackAsc() {
    return {
        type: FILTER_ATTACK_ASC,
    };
}

export function filterAttackDesc() {
    return {
        type: FILTER_ATTACK_DESC,
    };
}
