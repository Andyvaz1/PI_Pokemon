import { getAllPokemons, getAllTypes } from "../redux/actions";
import PokeCard from "./pokeCard";
import Pagination from "./pagination";

import { SearchBar } from "./searchBar";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import loadingGif from "../styles/videos/loading.gif";

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
    console.log("afuera", localPokemons);
    useEffect(() => {
        dispatch(getAllPokemons());
        dispatch(getAllTypes());
    }, []);

    useEffect(() => {
        setLocalPokemons(allPokemons);
    }, [allPokemons]);

    useEffect(() => {
        setCurrentPage(1);
    }, [localPokemons]);

    useEffect(() => {
        let arr = orderBy(localOrder, [...localPokemons]);
        setLocalPokemons(arr);
    }, [localOrder]);

    /*  useEffect(() => {
        setLocalPokemons(orderBy(localPokemons));
        console.log(localPokemons);
    }, [localPokemons]);
    ////////////////////*/

    /////Functiones OrderBy///////

    function orderID(array) {
        let result = array?.sort((a, b) => {
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
        let result = array?.sort((a, b) => {
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

    function orderBy(e, array) {
        console.log("funcion OrderBy", localOrder);
        let sorted = [];
        if (localPokemons === undefined) {
            sorted = [];
        }
        if (localPokemons[0] === "Pokemon Not Found") {
            sorted = array;
        }
        if (e === "-") {
            sorted = orderID(array);
        }
        if (e === "A-Z") {
            sorted = orderAlphaAZ(array);
        }
        if (e === "Z-A") {
            sorted = orderAlphaZA(array);
        }
        if (e === "attackAsc") {
            sorted = orderAttackAsc(array);
        }
        if (e === "attackDesc") {
            sorted = orderAttackDesc(array);
        }
        console.log(array);
        return array;
    }
    ///////VARIABLES///////

    const max = Math.ceil(localPokemons.length / perPage);

    ////////RENDERIZADO//////////

    return (
        <div>
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
                    <div className={styles.loading}>
                        LOADING
                        <img alt="loading" src={loadingGif} />
                    </div>
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
