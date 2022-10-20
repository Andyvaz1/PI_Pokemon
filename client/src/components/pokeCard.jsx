import styles from "../styles/pokeCard.module.css";
import { Link } from "react-router-dom";

export default function PokeCard(props) {
    return (
        <Link className={styles.link} to={`/${props.id}`}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <img
                        src={props.img}
                        className={styles.imagen}
                        alt={props.name}
                    />
                    <div className={styles.contentBx}>
                        <h4>
                            {props.name.charAt(0).toUpperCase() +
                                props.name.slice(1)}
                        </h4>
                        <span>Types: {props.types.join(", ")}</span>
                        <br />
                    </div>
                </div>
            </div>
        </Link>
    );
}
