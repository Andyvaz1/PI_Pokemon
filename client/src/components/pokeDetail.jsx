import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPokemonDetail } from "../redux/actions";
import { useParams } from "react-router-dom";
import styles from "../styles/pokeDetail.module.css";

export function PokeDetail() {
    const dispatch = useDispatch();
    const { pokemonDetail } = useSelector((state) => state);
    const params = useParams();

    useEffect(() => {
        const id = params.id;
        dispatch(getPokemonDetail(id));
    }, []);
    console.log(pokemonDetail);

    return (
        <div className={styles.fondo}>
            <h1>{pokemonDetail.name}</h1>
            <h2>#{pokemonDetail.id}</h2>
            <br />
            <img
                src={pokemonDetail.img}
                className={styles.img}
                alt="pokemonPhoto"
            />
            <div className={styles.generos}>
                <span>Types: </span>
                {pokemonDetail.types?.map((p, i) => (
                    <span key={i}> {p} </span>
                ))}
            </div>
            <div className={styles.generos}>
                <h4>STATS</h4>
                <br />
                <span>HP: {pokemonDetail.hp}</span>
                <br />
                <span>Attack: {pokemonDetail.attack}</span>
                <br />
                <span>Defence: {pokemonDetail.defence}</span>
                <br />
                <span>Speed: {pokemonDetail.speed}</span>
            </div>
        </div>
    );
}
