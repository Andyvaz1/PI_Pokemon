import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { searchPokemon } from "../redux/actions";
import styles from "../styles/searchBar.module.css";
import searchIcon from "../styles/imagenes/searchIcon.png";
import Filters from "./filters";

export function SearchBar({ setCurrentPage, setLocalPokemons, localPokemons }) {
    const dispatch = useDispatch();

    const [content, setContent] = useState("");

    function handleChange(e) {
        setContent(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(searchPokemon(content));
    }

    return (
        <div className={styles.container}>
            <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <input
                        type="text"
                        id="search"
                        autoComplete="off"
                        value={content}
                        placeholder="Search..."
                        onChange={(e) => handleChange(e)}
                        className={styles.inputSearch}
                    />
                </div>

                <button type="submit" className={styles.buttonSearch}>
                    <img
                        src={searchIcon}
                        className={styles.iconSearch}
                        alt="searchIcon"
                    />
                </button>
            </form>
            <Filters
                content={content}
                setCurrentPage={setCurrentPage}
                setLocalPokemons={setLocalPokemons}
                localPokemons={localPokemons}
            />
        </div>
    );
}
