import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getAllTypes } from "../redux/actions";
import styles from "../styles/pokeCreate.module.css";
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

export function PokeCreate() {
    const dispatch = useDispatch();
    ///Estados locales y globales///////
    const { allTypes } = useSelector((state) => state);
    const [disabledSubmit, setDisabledSubmit] = useState(true);
    const [checked, setChecked] = useState([]);

    //////obj imagenes types//////
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

    /////LOCAL REDUCER//////////
    const initialState = {
        name: "",
        hp: 1,
        attack: 1,
        defence: 1,
        speed: 1,
        height: 0.5,
        weight: 0.5,
        types: [],
    };
    const formularioReducer = (state, action) => {
        switch (action.type) {
            case "SET_NAME": {
                return {
                    ...state,
                    name: action.payload,
                };
            }
            case "SET_HP": {
                return {
                    ...state,
                    hp: action.payload,
                };
            }
            case "SET_ATTACK": {
                return {
                    ...state,
                    attack: action.payload,
                };
            }
            case "SET_DEFENCE": {
                return {
                    ...state,
                    defence: action.payload,
                };
            }
            case "SET_SPEED": {
                return {
                    ...state,
                    speed: action.payload,
                };
            }
            case "SET_HEIGHT": {
                return {
                    ...state,
                    height: action.payload,
                };
            }
            case "SET_WEIGHT": {
                return {
                    ...state,
                    weight: action.payload,
                };
            }
            case "ADD_TYPES": {
                return {
                    ...state,
                    types: [...state.types, action.payload],
                };
            }
            case "REMOVE_TYPES": {
                return {
                    ...state,
                    types: state.types.filter((t) => t !== action.payload),
                };
            }
            case "SUBMIT": {
                setChecked([]);
                console.log(initialState);
                return {
                    ...state,
                    ...initialState,
                };
            }
        }
    };
    const [formulario, setFormulario] = useReducer(
        formularioReducer,
        initialState
    );

    //////Hooks/////////
    useEffect(() => {
        dispatch(getAllTypes());
    }, []);

    useEffect(() => {
        let arr = formulario;
        if (arr.name !== "" && arr.types.length > 0) {
            setDisabledSubmit(false);
        } else setDisabledSubmit(true);
    }, [formulario]);

    /////////Event Handlerers/////////

    const checkChange = (value) => {
        if (checked.indexOf(value) !== -1) {
            setChecked(checked.filter((checkBox) => checkBox !== value));
        } else {
            setChecked([...checked, value]);
        }
    };
    function checkClick(e) {
        if (e.target.checked) {
            setFormulario({
                type: "ADD_TYPES",
                payload: e.target.value,
            });
        } else {
            setFormulario({
                type: "REMOVE_TYPES",
                payload: e.target.value,
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(createPokemon(formulario));
        alert("Pokemon Registration Succesful!");
        setFormulario({ type: "SUBMIT" });
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.title}>Register a new Pokemon!</div>
                <form
                    className={styles.userDetail}
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <div className={styles.inputBox}>
                        <h4>
                            Name{" "}
                            {formulario.name !== "" &&
                            formulario.name.length <= 12 ? (
                                <span> ✅</span>
                            ) : (
                                <span className={styles.spancitoError}>
                                    *required
                                </span>
                            )}
                        </h4>

                        <input
                            required
                            maxLength={12}
                            type="text"
                            placeholder="Name"
                            id="imput-name"
                            name="name"
                            className={styles.inputName}
                            value={formulario.name}
                            onChange={(e) =>
                                setFormulario({
                                    type: "SET_NAME",
                                    payload: e.target.value,
                                })
                            }
                        />

                        <span
                            className={
                                formulario.name.length >= 12
                                    ? styles.spancitoError
                                    : styles.spancito
                            }
                        >
                            *(max 12 chartacters)
                        </span>
                    </div>
                    <br />
                    <div>
                        <h4>
                            Types{" "}
                            {formulario.types.length > 0 ? (
                                <span> ✅</span>
                            ) : (
                                <span className={styles.spancitoError}>
                                    *required
                                </span>
                            )}
                        </h4>
                        <div className={styles.typesDetails}>
                            <ul className={styles.typesDetails}>
                                {allTypes.map((e, index) => (
                                    <li
                                        key={index}
                                        className={styles.typesDetails}
                                    >
                                        <img
                                            id={e.name}
                                            className={styles.typeImage}
                                            alt={e.name}
                                            src={objType[e.name]}
                                        ></img>
                                        <label>
                                            {" " +
                                                e.name.charAt(0).toUpperCase() +
                                                e.name.slice(1) +
                                                " "}
                                        </label>
                                        <input
                                            key={index}
                                            type="checkbox"
                                            value={e.name}
                                            name="types"
                                            onClick={(e) => checkClick(e)}
                                            onChange={() => checkChange(index)}
                                            checked={checked.includes(index)}
                                            disabled={
                                                !checked.includes(index) &&
                                                checked.length > 1
                                            }
                                        />
                                    </li>
                                ))}
                            </ul>{" "}
                            <span
                                style={
                                    formulario.types.length > 1
                                        ? { color: "red" }
                                        : { color: "black" }
                                }
                                className={styles.spancito}
                            >
                                *max 2 types
                            </span>
                        </div>
                    </div>
                    <div name="stats">
                        <h4>Stats:</h4>
                        <label>Hp: </label>
                        <input
                            type="number"
                            id="hp"
                            className={styles.inputNumber}
                            value={formulario.hp}
                            min={1}
                            max={1000}
                            onChange={(e) => {
                                if (e.target.value > 1000) {
                                    setFormulario({
                                        type: "SET_HP",
                                        payload: 1000,
                                    });
                                }
                                if (
                                    e.target.value < 1 ||
                                    e.target.value === ""
                                ) {
                                    setFormulario({
                                        type: "SET_HP",
                                        payload: 1,
                                    });
                                } else {
                                    setFormulario({
                                        type: "SET_HP",
                                        payload: e.target.value,
                                    });
                                }
                            }}
                        />
                        <label>Attack: </label>
                        <input
                            type="number"
                            id="attack"
                            className={styles.inputNumber}
                            value={formulario.attack}
                            min={1}
                            max={1000}
                            onChange={(e) => {
                                if (e.target.value > 1000) {
                                    setFormulario({
                                        type: "SET_ATTACK",
                                        payload: 1000,
                                    });
                                }
                                if (
                                    e.target.value < 1 ||
                                    e.target.value === ""
                                ) {
                                    setFormulario({
                                        type: "SET_ATTACK",
                                        payload: 1,
                                    });
                                } else {
                                    setFormulario({
                                        type: "SET_ATTACK",
                                        payload: e.target.value,
                                    });
                                }
                            }}
                        />
                        <label>Defence: </label>
                        <input
                            type="number"
                            id="defence"
                            className={styles.inputNumber}
                            value={formulario.defence}
                            min={1}
                            max={1000}
                            onChange={(e) => {
                                if (e.target.value > 1000) {
                                    setFormulario({
                                        type: "SET_DEFENCE",
                                        payload: 1000,
                                    });
                                }
                                if (
                                    e.target.value < 1 ||
                                    e.target.value === ""
                                ) {
                                    setFormulario({
                                        type: "SET_DEFENCE",
                                        payload: 1,
                                    });
                                } else {
                                    setFormulario({
                                        type: "SET_DEFENCE",
                                        payload: e.target.value,
                                    });
                                }
                            }}
                        />
                        <label>Speed: </label>
                        <input
                            type="number"
                            id="speed"
                            className={styles.inputNumber}
                            value={formulario.speed}
                            min={1}
                            max={1000}
                            onChange={(e) => {
                                if (e.target.value > 1000) {
                                    setFormulario({
                                        type: "SET_SPEED",
                                        payload: 1000,
                                    });
                                }
                                if (
                                    e.target.value < 1 ||
                                    e.target.value === ""
                                ) {
                                    setFormulario({
                                        type: "SET_SPEED",
                                        payload: 1,
                                    });
                                } else {
                                    setFormulario({
                                        type: "SET_SPEED",
                                        payload: e.target.value,
                                    });
                                }
                            }}
                        />
                        <span className={styles.spancito}>*max 1000 each</span>
                    </div>

                    <div name="Biometrics">
                        <h4>Biometrics: </h4>
                        <div>
                            <label>Height: </label>
                            <input
                                type="number"
                                id="height"
                                className={styles.inputNumber}
                                value={formulario.height}
                                min={0.5}
                                step={0.5}
                                onChange={(e) => {
                                    if (
                                        e.target.value < 0.5 ||
                                        e.target.value === ""
                                    ) {
                                        setFormulario({
                                            type: "SET_HEIGHT",
                                            payload: 0.5,
                                        });
                                    } else {
                                        setFormulario({
                                            type: "SET_HEIGHT",
                                            payload: e.target.value,
                                        });
                                    }
                                }}
                            />
                            <span>Cm</span>
                        </div>
                        <div>
                            <label>Weight:</label>
                            <input
                                type="number"
                                id="weight"
                                className={styles.inputNumber}
                                value={formulario.weight}
                                min={0.5}
                                step={0.5}
                                onChange={(e) => {
                                    if (
                                        e.target.value < 0.5 ||
                                        e.target.value === ""
                                    ) {
                                        setFormulario({
                                            type: "SET_WEIGHT",
                                            payload: 0.5,
                                        });
                                    } else {
                                        setFormulario({
                                            type: "SET_WEIGHT",
                                            payload: e.target.value,
                                        });
                                    }
                                }}
                            />
                            <span>Kg</span>
                        </div>
                    </div>
                    <button
                        className={
                            disabledSubmit ? styles.buttonDes : styles.buttonAct
                        }
                        type="submit"
                        name="submit"
                        disabled={disabledSubmit}
                    >
                        Register!
                    </button>
                </form>
            </div>
        </div>
    );
}

///////// Physical Characteristics///
