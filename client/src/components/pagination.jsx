import { React } from "react";
import styles from "../styles/pagination.module.css";

export default function Pagination({ currentPage, setCurrentPage, max }) {
    ////VARIABLES y FUNCIONES ON CLICK////////

    let index = [];
    for (let i = 1; i <= max; i++) {
        index.push(i);
    }

    const onClickPrev = () => {
        setCurrentPage(currentPage - 1);
    };
    const onClickNext = () => {
        setCurrentPage(currentPage + 1);
    };

    const onClickSetPage = (i) => {
        setCurrentPage(i);
    };

    return (
        <div className={styles.pagContainer}>
            <button
                onClick={onClickPrev}
                disabled={currentPage === 1 ? true : false}
                className={styles.button3}
            >
                PREV
            </button>
            {index?.map((i) => (
                <button
                    className={
                        currentPage === i ? styles.button1 : styles.button2
                    }
                    onClick={() => onClickSetPage(i)}
                    key={i}
                >
                    {i}
                </button>
            ))}
            <button
                onClick={() => onClickNext()}
                disabled={currentPage === max ? true : false}
                className={styles.button3}
            >
                Next
            </button>
        </div>
    );
}
