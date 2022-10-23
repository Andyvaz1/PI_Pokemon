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
    const { allPokemons, allTypes } = useSelector((state) => state);

    ///////////ESTADOS LOCALES ///////////////

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const [localPokemons, setLocalPokemons] = useState([]);
    const [localOrder, setLocalOrder] = useState("-");

    /////////////HOOKS///////////

    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getAllTypes());
    }, []);
    useEffect(() => {
        setLocalPokemons(allPokemons);
    }, [allPokemons]);
    useEffect(() => {
        setCurrentPage(1);
        console.log(localPokemons);
    }, [localPokemons]);

    useEffect(() => {
        console.log("orderEffect");
    }, [localOrder]);

    /*  useEffect(() => {
        setLocalPokemons(orderBy(localPokemons));
        console.log(localPokemons);
    }, [localPokemons]);
    ////////////////////*/

    /////Functiones OrderBy///////

    function orderID(array) {
        let result = array.sort((a, b) => {
            if (parseInt(a.id) > parseInt(b.id)) {
                return 1;
            }
            if (parseInt(a.id) < parseInt(b.id)) {
                return -1;
            }

            return 0;
        });
        return result;
    }

    function orderAlphaAZ(array) {
        let result = array.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }

            return 0;
        });
        return result;
    }

    function orderAlphaZA(array) {
        let result = array
            .sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }

                return 0;
            })
            .reverse();
        return result;
    }

    function orderAttackAsc(array) {
        let result = array.sort((a, b) => {
            if (parseFloat(a.attack) > parseFloat(b.attack)) {
                return 1;
            }
            if (parseFloat(a.attack) < parseFloat(b.attack)) {
                return -1;
            }

            return 0;
        });
        return result;
    }

    function orderAttackDesc(array) {
        let result = array.sort((a, b) => {
            if (parseFloat(a.attack) < parseFloat(b.attack)) {
                return 1;
            }
            if (parseFloat(a.attack) > parseFloat(b.attack)) {
                return -1;
            }

            return 0;
        });
        return result;
    }

    function orderBy(e) {
        setLocalOrder(e);
        console.log(localPokemons);
        console.log(localOrder);
        if (localPokemons === undefined) {
            return [];
        }
        if (localPokemons[0] === "Pokemon Not Found") {
            return localPokemons;
        }
        if (e === "-") {
            setLocalPokemons(orderID(localPokemons));
        }
        if (e === "A-Z") {
            return orderAlphaAZ(localPokemons);
        }
        if (e === "Z-A") {
            return orderAlphaZA(localPokemons);
        }
        if (e === "attackAsc") {
            return orderAttackAsc(localPokemons);
        }
        if (e === "attackDesc") {
            return orderAttackDesc(localPokemons);
        }
    }
    ///////VARIABLES///////

    const max = Math.ceil(localPokemons.length / perPage);

    ////////RENDERIZADO//////////

    return (
        <div>
            <h1>PokeOracle</h1>
            <SearchBar
                setCurrentPage={setCurrentPage}
                setLocalPokemons={setLocalPokemons}
                localPokemons={localPokemons}
                localOrder={localOrder}
                setLocalOrder={setLocalOrder}
                orderBy={orderBy}
            />
            <div>
                <Pagination
                    max={max}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
            <div className={styles.grid}>
                {localPokemons.length === 0 ? (
                    <div className={styles.loading}>LOADING</div>
                ) : localPokemons[0] === "Pokemon Not Found" ? (
                    <div className={styles.loading}>Pokemon Not Found</div>
                ) : (
                    localPokemons
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
