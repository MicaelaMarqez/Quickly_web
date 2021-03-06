import styles from '../../styles/customerdetails.module.css'
import { MdOutlineInfo } from "react-icons/md";
import ProductCard from './ProductCard';

const Favorites = (props) => {
    return (
        <div className={styles.favouritesContainer}>
            {props.favorites.length
                ? props.favorites.map(favourite => <ProductCard data={favourite} />)
                : <span className={styles.warning}><MdOutlineInfo />El usuario no ha guardado ningún favorito.</span>}
        </div>
    )
}
export default Favorites