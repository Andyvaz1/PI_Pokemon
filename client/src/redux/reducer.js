import {
    GET_ALL_POKEMONS,
    GET_ALL_TYPES,
    GET_POKEMON_DETAIL,
    CREATE_POKEMON,
    FILTER_TYPE,
    FILTER_CREATED,
    FILTER_ALPHA_AZ,
    FILTER_ALPHA_ZA,
    FILTER_ATTACK_ASC,
    FILTER_ATTACK_DESC,
    NOT_FOUND,
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

        case FILTER_TYPE: {
            return {
                ...state,
                allPokemons: state.allPokemons.filter((pokemon) => {
                    return pokemon.types.find((t) => {
                        return t === action.payload;
                    });
                }),
            };
        }

        case FILTER_CREATED: {
            return {
                ...state,
                allPokemons: state.allPokemons.filter((pokemon) => {
                    return pokemon.dataBase.find((db) => {
                        return db === action.payload;
                    });
                }),
            };
        }

        case FILTER_ALPHA_AZ: {
            return {
                ...state,
                allPokemons: state.allPokemons.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }

                    return 0;
                }),
            };
        }

        case FILTER_ALPHA_ZA:
            return {
                ...state,
                allPokemons: state.allPokemons.sort().reverse(),
            };

        case FILTER_ATTACK_DESC:
            return {
                ...state,
                allPokemons: state.allPokemons.sort((a, b) => {
                    if (parseFloat(a.attack) > parseFloat(b.attack)) {
                        return 1;
                    }
                    if (parseFloat(a.attack) < parseFloat(b.attack)) {
                        return -1;
                    }

                    return 0;
                }),
            };

        case FILTER_ATTACK_ASC:
            return {
                ...state,
                allPokemons: state.allPokemons.sort((a, b) => {
                    if (parseFloat(a.attack) < parseFloat(b.attack)) {
                        return 1;
                    }
                    if (parseFloat(a.attack) > parseFloat(b.attack)) {
                        return -1;
                    }

                    return 0;
                }),
            };

        case NOT_FOUND:
            return {
                ...state,
                allPokemons: action.payload,
            };

        default: {
            return {
                ...state,
            };
        }
    }
};
