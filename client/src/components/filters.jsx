import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/filters.module.css";

import {
    getAllPokemons,
    searchPokemon,
    filterType,
    filterOrigin,
    filterAlphaAZ,
    filterAlphaZA,
    filterAttackAsc,
    filterAttackDesc,
} from "../redux/actions";

export default function Filters({ content, setCurrentPage, setLocalPokemons }) {
    const dispatch = useDispatch();
    const { allTypes, allPokemons } = useSelector((state) => state);
    const [disabledState, setDisabledState] = useState(false);

    useEffect(() => {
        if (content.length > 0) {
            setDisabledState(true);
        } else setDisabledState(false);
    }, [content]);
    /////Creo una lista de tipos en orden ascendente y Creo el componente option list/////
    let typeList = allTypes.map((t) => {
        return t.name;
    });
    typeList.sort();
    let optionsList = [];
    for (let i = 0; i < typeList.length; i++) {
        optionsList.push(
            <option value={typeList[i]} key={i}>
                {typeList[i].charAt(0).toUpperCase() + typeList[i].slice(1)}
            </option>
        );
    }

    //////Event Handelers//////////////

    function handleChangeType(e) {
        let pokemonByType = allPokemons.filter((pokemon) => {
            return pokemon.types.find((t) => {
                return t === e.target.value;
            });
        });
        if (pokemonByType.length > 0) {
            setLocalPokemons(pokemonByType);
        }
        if (e.target.value === "All") {
            setLocalPokemons(allPokemons);
        }
        if (pokemonByType.length === 0 && e.target.value !== "All") {
            setLocalPokemons(["Pokemon Not Found"]);
        }
    }

    function handleChangeOrigin(e) {
        let pokemonByOrigin = allPokemons.filter((pokemon) => {
            return pokemon.dataBase == e.target.value;
        });
        console.log(pokemonByOrigin);
        if (e.target.value === "All") {
            setLocalPokemons(allPokemons);
        }
        if (pokemonByOrigin.length > 0) {
            setLocalPokemons(pokemonByOrigin);
        }
        if (pokemonByOrigin.length === 0 && e.target.value !== "All") {
            setLocalPokemons(["Pokemon Not Found"]);
        }
    }

    function handleOrderBy(e) {
        setCurrentPage(1);
        if (e.target.value === "-") {
            dispatch(getAllPokemons());
        }
        if (e.target.value === "A-Z") {
            dispatch(filterAlphaAZ());
        }
        if (e.target.value === "Z-A") {
            dispatch(filterAlphaZA());
        }
        if (e.target.value === "attackDesc") {
            dispatch(filterAttackAsc());
        }
        if (e.target.value === "attackAsc") {
            dispatch(filterAttackDesc());
        }
    }

    return (
        <div className={styles.filtersContainer}>
            <form onChange={(e) => handleChangeType(e)}>
                <label className={styles.label}>Type:</label>
                <select
                    name="selectType"
                    className={styles.selectFilter}
                    disabled={disabledState}
                >
                    <option key="keyAllTypes" value="All">
                        All
                    </option>
                    {optionsList}
                </select>
            </form>
            <form onChange={(e) => handleChangeOrigin(e)}>
                <label className={styles.label}>Origin:</label>
                <select
                    name="selectOrigin"
                    className={styles.selectFilter}
                    disabled={disabledState}
                >
                    <option key="keyAllOrigin" value="All">
                        All
                    </option>
                    <option key="keyOriginal" value={2}>
                        Original
                    </option>
                    <option key="keyUser" value={1}>
                        User
                    </option>
                </select>
            </form>
            <form onChange={(e) => handleOrderBy(e)}>
                <label className={styles.label}>Order by:</label>
                <select name="orderBy" className={styles.selectFilter}>
                    <option key="-" value="-">
                        -
                    </option>
                    <option key="alphaAsc" value="A-Z">
                        A-Z
                    </option>
                    <option key="alphaDesc" value="Z-A">
                        Z-A
                    </option>
                    <option key="attackDesc" value="attackDesc">
                        Attack ↡
                    </option>
                    <option key="attackAsc" value="attackAsc">
                        Attack ↟
                    </option>
                </select>
            </form>
        </div>
    );
}
