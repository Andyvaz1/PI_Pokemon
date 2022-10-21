import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/filters.module.css";
import {
    getAllPokemon,
    searchPokemon,
    filterType,
    filterCreated,
    filterAlphaAZ,
    filterAlphaZA,
    filterAttackAsc,
    filterAttackDesc,
} from "../redux/actions";

export function Filters() {
    const { allTypes } = useSelector((state) => state);

    /////Creo una lista de tipos en orden ascendente y Creo el componente option list/////
    let typeList = [];
    allTypes.map((t) => {
        typeList.push(t.name);
    });
    typeList.sort();
    let optionsList = [];
    for (let i = 0; i < typeList.length; i++) {
        optionsList.push(
            <option value={typeList[i]} key={i}>
                {typeList[i]}
            </option>
        );
    }
}
