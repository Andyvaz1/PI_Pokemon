import { Link } from "react-router-dom";
import styles from "../styles/land.module.css";
import videoFondo from "../styles/videos/videoFondo.mp4";
import landTitle from "../styles/imagenes/landTitle.png";
import pokeBallLand from "../styles/imagenes/pokeBallLand.png";

export function Land() {
    return (
        <div className={styles.section}>
            <h1 className={styles.sectionLink}>
                <Link to="/home" className={styles.link}>
                    <img
                        src={landTitle}
                        className={styles.img}
                        alt="The Pokemon Oracle"
                    />
                </Link>
            </h1>

            <div className={styles.videoContainer}>
                <div className={styles.videoOverlay}></div>
                <video autoPlay loop muted className={styles.videoPlayer}>
                    <source src={videoFondo} type="video/mp4" />
                </video>
            </div>
        </div>
    );
}
