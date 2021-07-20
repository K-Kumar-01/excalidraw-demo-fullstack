import styles from '../styles/loader.module.css';
const Loader = () => {
  return (
    <div className={styles.loaderBackdrop}>
      <div className={styles.loader} />
    </div>
  );
};

export default Loader;
