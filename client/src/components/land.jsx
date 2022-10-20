import { Link } from "react-router-dom";
import styles from "../styles/land.module.css";

export function Land() {
    return (
        <div>
            <h1 className={styles.sectionLink}>
                <Link to="/home">
                    <button type="button">Enter!</button>
                </Link>
            </h1>
        </div>
    );
}
