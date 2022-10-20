import {
    GET_ALL_POKEMONS,
    GET_ALL_TYPES,
    GET_POKEMON_DETAIL,
    CREATE_POKEMON,
} from "./actions";

//////////Estado inicial //////////
const initialState = {
    allPokemons: [],
    pokemonDetail: {},
    allTypes: [],
};

/////////////REDUCER///////////
export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
            };

        case GET_ALL_TYPES:
            return {
                ...state,
                allTypes: action.payload,
            };

        case GET_POKEMON_DETAIL: {
            return {
                ...state,
                pokemonDetail: action.payload,
            };
        }

        default: {
            return {
                ...state,
            };
        }
    }
};
