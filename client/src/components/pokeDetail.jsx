import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokemonDetail } from "../redux/actions";
import { useParams } from "react-router-dom";
import styles from "../styles/pokeDetail.module.css";
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

export function PokeDetail() {
    /////Traer dispatch////////
    const dispatch = useDispatch();

    ////Traigo params y estado global/////
    const { pokemonDetail } = useSelector((state) => state);
    const params = useParams();

    //////////hooks////////

    useEffect(() => {
        const id = params.id;
        dispatch(getPokemonDetail(id));
    }, []);
    console.log(pokemonDetail);

    ///////obj con fotos de tipos////////////
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
        <div>
            {pokemonDetail.name ? (
                <div className={styles.fondo}>
                    <div className={styles.container}>
                        <div className={styles.card}>
                            <div className={styles.contentBx}>
                                <h1 className={styles.h1}>
                                    #{pokemonDetail.id}
                                    <span> </span>
                                    {pokemonDetail.name
                                        ?.charAt(0)
                                        .toUpperCase() +
                                        pokemonDetail.name?.slice(1)}
                                </h1>
                            </div>
                            <br />
                            <img
                                src={pokemonDetail.img}
                                className={styles.imagen}
                                alt="pokemonPhoto"
                            />
                            <div className={styles.types}>
                                <span className={styles.spanType}>
                                    Types: {pokemonDetail.types?.join(", ")}
                                </span>
                                <br />
                                {pokemonDetail.types?.map((type) => {
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
                            <div className={styles.character}>
                                <div className={styles.stats}>
                                    <h4>STATS</h4>
                                    <br />
                                    <span>HP: {pokemonDetail.hp}</span>
                                    <br />
                                    <span>Attack: {pokemonDetail.attack}</span>
                                    <br />
                                    <span>
                                        Defence: {pokemonDetail.defence}
                                    </span>
                                    <br />
                                    <span>Speed: {pokemonDetail.speed}</span>
                                </div>
                                <div className={styles.bio}>
                                    <h4>BIOMETRICS</h4>
                                    <br />
                                    <span>
                                        Height: {pokemonDetail.height * 2.54} Cm
                                    </span>
                                    <br />
                                    <span>
                                        Weight: {pokemonDetail.weight * 0.45} Kg
                                    </span>
                                </div>{" "}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.loading}></div>
            )}
        </div>
    );
}
