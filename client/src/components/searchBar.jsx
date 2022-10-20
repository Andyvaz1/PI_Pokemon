import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchPokemon } from "../redux/actions";
import styles from "../styles/searchBar.module.css";
import searchIcon from "../styles/imagenes/searchIcon.png";

export function SearchBar() {
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
                    <img src={searchIcon} className={styles.iconSearch} />
                </button>
            </form>
        </div>
    );
}
