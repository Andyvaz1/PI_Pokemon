import { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getAllTypes } from "../redux/actions";
export function PokeCreate() {
    const dispatch = useDispatch();
    ///Estados locales y globales///////
    const { allTypes } = useSelector((state) => state);
    const [disabledSubmit, setDisabledSubmit] = useState(true);
    const [nameState, setNameState] = useState("");
    const [checked, setChecked] = useState([]);
    const [hpState, setHpState] = useState(1);
    const [attackState, setAttackState] = useState(1);
    const [defenceState, setDefenceState] = useState(1);
    const [speedState, setSpeedState] = useState(1);
    const [heightState, setHeightState] = useState(1);
    const [weightState, setWeightState] = useState(1);
    const [typeSelection, setTypeSelection] = useState([]);

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
        if (arr.name.length > 0 && arr.types.length > 0) {
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
        <div>
            <h1>Register a new Pokemon!</h1>
            <form
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <div>
                    <h4>Name</h4>

                    <input
                        type="text"
                        placeholder="Name"
                        id="imput-name"
                        name="name"
                        value={formulario.name}
                        onChange={(e) =>
                            setFormulario({
                                type: "SET_NAME",
                                payload: e.target.value,
                            })
                        }
                    />
                    {formulario.name !== "" ? (
                        <label>✅</label>
                    ) : (
                        <label>*required</label>
                    )}
                </div>
                <br />
                <div>
                    <h4>Types</h4>
                    <div>
                        {allTypes.map((e, index) => (
                            <div key={index}>
                                <label>
                                    {e.name.charAt(0).toUpperCase() +
                                        e.name.slice(1)}
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
                            </div>
                        ))}{" "}
                        <span
                            style={
                                formulario.types.length > 1
                                    ? { color: "red" }
                                    : { color: "black" }
                            }
                        >
                            *max 2 types
                        </span>
                    </div>
                    <div name="stats">
                        <h4>Stats:</h4>
                        <label>Hp: </label>
                        <input
                            type="number"
                            id="hp"
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
                    </div>
                </div>
                <div name="Biometrics">
                    <h4>Biometrics</h4>
                    <div>
                        <label>Height: </label>
                        <input
                            type="number"
                            id="height"
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
                        <label>Weight: </label>
                        <input
                            type="number"
                            id="weight"
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
                <button type="submit" name="submit" disabled={disabledSubmit}>
                    Register!
                </button>
            </form>
            <span>{formulario.types}</span>
        </div>
    );
}

///////// Physical Characteristics///
