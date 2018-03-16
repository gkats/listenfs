import { h } from 'preact';
import styles from './Loader.css';

const Loader = ({ visible }) =>
  visible ? (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.loader}>
          <div className={styles.spinner} />
        </div>
      </div>
    </div>
  ) : null;

export default Loader;
