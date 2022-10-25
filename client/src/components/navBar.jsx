import { Link } from "react-router-dom";
import styles from "../styles/navBar.module.css";
import homeIcon from "../styles/imagenes/homeIcon2.png";
import titleImg from "../styles/imagenes/title.png";

export function NavBar() {
    return (
        <header className={styles.header}>
            <div>
                <Link to="/home" className={styles.link}>
                    <button className={styles.raise2}>
                        <img src={homeIcon} alt="Home" />
                    </button>
                </Link>
            </div>
            <Link to="/home" className={styles.linkLogo}>
                <div>
                    <h1 className={styles.h1}>
                        <img src={titleImg} alt="The Pokemon Oracle" />
                    </h1>
                </div>
            </Link>
            <div>
                <button className={styles.raise}>
                    <Link to="/pokemoncreate" className={styles.link}>
                        + Add Pokemon
                    </Link>
                </button>
            </div>
        </header>
    );
}
