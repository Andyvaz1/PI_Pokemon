import styles from "../styles/pokeCard.module.css";
import { Link } from "react-router-dom";
import grass from "../styles/imagenes/grass.png";
import bug from "../styles/imagenes/bug.png";
import dark from "../styles/imagenes/dark.png";
import dragon from "../styles/imagenes/dragon.png";
import electric from "../styles/imagenes/electric.png";
import fairy from "../styles/imagenes/fairy.png";
import fighting from "../styles/imagenes/fighting.png";
import fire from "../styles/imagenes/fire.png";
import flying from "../styles/imagenes/flying.png";
import ghost from "../styles/imagenes/ghost.png";
import water from "../styles/imagenes/water.png";
import ground from "../styles/imagenes/ground.png";
import ice from "../styles/imagenes/ice.png";
import normal from "../styles/imagenes/normal.png";
import poison from "../styles/imagenes/poison.png";
import psychic from "../styles/imagenes/psychic.png";
import rock from "../styles/imagenes/rock.png";
import steel from "../styles/imagenes/steel.png";

export default function PokeCard(props) {
    let objType = {
        grass: grass,
        bug: bug,
        dark: dark,
        dragon: dragon,
        electric: electric,
        fairy: fairy,
        fighting: fighting,
        fire: fire,
        flying: flying,
        ghost: ghost,
        water: water,
        ground: ground,
        ice: ice,
        normal: normal,
        poison: poison,
        psychic: psychic,
        rock: rock,
        steel: steel,
    };

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
                        <h1 className={styles.h1}>
                            {props.name.charAt(0).toUpperCase() +
                                props.name.slice(1)}
                        </h1>
                        <span>Types: {props.types.join(", ")}</span>
                        <br />
                        {props.types.map((type) => {
                            return (
                                <img
                                    id="type"
                                    className={styles.typeImage}
                                    alt={type}
                                    src={objType[type]}
                                ></img>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Link>
    );
}
