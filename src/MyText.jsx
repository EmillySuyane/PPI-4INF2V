import styles from "./MyText.module.css";

export function MyText() {
  return (
    <div className={styles.container}>
      <div className={styles.div}>
        <h1 className={styles.title}>Meu primeiro React App</h1>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ipsum,
          aliquid alias nemo consectetur dignissimos delectus quos nisi deleniti
          obcaecati vitae dolorem fuga, neque placeat laborum deserunt maiores
          mollitia? Excepturi?
        </p>
      </div>
    </div>
  );
}