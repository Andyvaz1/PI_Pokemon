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

export default function Filters({
    content,
    localPokemons,
    setCurrentPage,
    setLocalPokemons,
    localOrder,
    setLocalOrder,
    orderBy,
}) {
    const dispatch = useDispatch();
    const { allTypes, allPokemons } = useSelector((state) => state);
    const [disabledState, setDisabledState] = useState(false);
    const [localType, setLocalType] = useState("All");
    const [localOrigin, setLocalOrigin] = useState("All");

    /////// HOOKS /////////
    /* useEffect(() => {
        setLocalType("All");
        setLocalOrigin("All");
    }, []); */

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
    ///////FUNCIONES SETTERS ONCHANGE EL ESTADO LOCAL///////
    function setterType(e) {
        setLocalType(e.target.value);
    }

    function setterOrigin(e) {
        setLocalOrigin(e.target.value);
    }

    function setterOrder(e) {
        setLocalOrder(e.target.value);
        setLocalPokemons(orderBy(localPokemons));
    }

    //////Funciones Filtro//////////
    function filterType(t) {
        let pokemonByType = allPokemons.filter((pokemon) => {
            return pokemon.types.find((type) => {
                return type === t;
            });
        });
        return pokemonByType;
    }

    function filterOrigin(o, array) {
        let pokemonByOrigin = array.filter((pokemon) => {
            return pokemon.dataBase == o;
        });
        return pokemonByOrigin;
    }

    //////Event Handelers//////////////

    function applyFilter(e) {
        e.preventDefault();
        let pokemonByType = filterType(localType, allPokemons);
        let pokemonByOrigin = filterOrigin(localOrigin, allPokemons);
        let pokemonBothFilters = filterOrigin(localOrigin, pokemonByType);

        if (localType === "All" && localOrigin === "All") {
            setLocalPokemons(allPokemons);
        }
        if (pokemonByType.length > 0 && localOrigin === "All") {
            setLocalPokemons(pokemonByType);
        }
        if (pokemonByOrigin.length > 0 && localType === "All") {
            setLocalPokemons(pokemonByOrigin);
        }
        if (pokemonBothFilters.length > 0) {
            setLocalPokemons(pokemonBothFilters);

            console.log("bothflters");
        }
        if (
            pokemonBothFilters.length === 0 &&
            localType !== "All" &&
            pokemonBothFilters.length === 0 &&
            localOrigin !== "All"
        ) {
            console.log("No filter match");
            setLocalPokemons(["Pokemon Not Found"]);
        }
        if (
            (pokemonByType.length === 0 && localType !== "All") ||
            (pokemonByOrigin.length === 0 && localOrigin !== "All")
        ) {
            console.log("No filter match");
            setLocalPokemons(["Pokemon Not Found"]);
        }
    }

    return (
        <div className={styles.filtersContainer}>
            <form>
                <label className={styles.label}>FILTERS:</label>
                <label className={styles.label}>Type:</label>
                <select
                    name="selectType"
                    className={styles.selectFilter}
                    disabled={disabledState}
                    onChange={(e) => setterType(e)}
                >
                    <option key="keyAllTypes" value="All">
                        All
                    </option>
                    {optionsList}
                </select>
                <label className={styles.label}>Origin:</label>
                <select
                    name="selectOrigin"
                    className={styles.selectFilter}
                    disabled={disabledState}
                    onChange={(e) => setterOrigin(e)}
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
                <button
                    name="apply"
                    onClick={(e) => {
                        applyFilter(e);
                    }}
                >
                    Apply
                </button>
            </form>
            <span></span>
            <form onChange={(e) => orderBy(e.target.value)}>
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
