import { getAllPokemons, getAllTypes } from "../redux/actions";
import PokeCard from "./pokeCard";
import Pagination from "./pagination";
import { SearchBar } from "./searchBar";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import notFoundPic from "../styles/imagenes/notFound.png";

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
    console.log(currentPage);
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

        return array;
    }
    ///////VARIABLES///////

    const max = Math.ceil(localPokemons.length / perPage);

    ////////RENDERIZADO//////////

    return (
        <div className={styles.fondo1}>
            <SearchBar
                setCurrentPage={setCurrentPage}
                setLocalPokemons={setLocalPokemons}
                localPokemons={localPokemons}
                localOrder={localOrder}
                setLocalOrder={setLocalOrder}
                orderBy={orderBy}
            />
            {max > 0 ? (
                <Pagination
                    className={styles.button}
                    max={max}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            ) : (
                <span></span>
            )}
            <div
                className={
                    localPokemons.length === 0
                        ? styles.videoContainer
                        : styles.grid
                }
            >
                {localPokemons.length === 0 ? (
                    <div></div>
                ) : localPokemons[0] === "Pokemon Not Found" ? (
                    <img
                        className={styles.notFound}
                        src={notFoundPic}
                        alt="Pokemon Not Found"
                    ></img>
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

            {max > 0 ? (
                <Pagination
                    className={styles.button}
                    max={max}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            ) : (
                <span></span>
            )}
            <br />
        </div>
    );
}
