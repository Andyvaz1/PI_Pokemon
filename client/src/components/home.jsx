import { getAllPokemons, getAllTypes } from "../redux/actions";
import PokeCard from "./pokeCard";
import Pagination from "./pagination";
import { SearchBar } from "./searchBar";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import styles from "../styles/home.module.css";

export function Home() {
    /////////TRAER EL DISPATCH PARA USAR EL REDUCER Y PROPIEDAD allPokemons del estado Global/////////
    const dispatch = useDispatch();
    const { allPokemons } = useSelector((state) => state);

    ///////////ESTADOS LOCALES ///////////////

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(12);

    /////////////USE EFECT PARA SETTEAR EL ESTADO GLOBAL CUANDO DE MONTA///////////

    useEffect(() => {
        dispatch(getAllPokemons());
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [allPokemons]);

    ///////VARIABLES///////
    const max = Math.ceil(allPokemons.length / perPage);

    ////////RENDERIZADO//////////

    return (
        <div>
            <h1>PokeOracle</h1>
            <SearchBar />
            <div>
                <Pagination
                    max={max}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <div className={styles.grid}>
                {allPokemons.length === 0 ? (
                    <div className={styles.loading}>LOADING</div>
                ) : allPokemons[0] === "Pokemon Not Found" ? (
                    <div className={styles.loading}>Pokemon Not Found</div>
                ) : (
                    allPokemons
                        .slice(
                            (currentPage - 1) * perPage,
                            (currentPage - 1) * perPage + perPage
                        )
                        .map((p) => (
                            <div key={p.id}>
                                <PokeCard
                                    img={p.img}
                                    name={p.name}
                                    types={p.types}
                                    id={p.id}
                                />
                            </div>
                        ))
                )}
                <br />
            </div>
            <div>
                <Pagination
                    max={max}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <br />
            </div>
        </div>
    );
}
