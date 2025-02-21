import NextArrowIcon from '../styles/assets/arrow.svg?react';
import styles from './NextArrow.module.css';

const NextArrow = () => {
    return (
        <div className={styles.icon}>
            <NextArrowIcon className={styles.arrow1} />
            <NextArrowIcon className={styles.arrow2} />
            <NextArrowIcon className={styles.arrow3} />
        </div>
    );
};

export default NextArrow;
