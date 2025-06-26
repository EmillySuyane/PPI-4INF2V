import { useState } from "react";
import styles from "./LuckyNumber.module.css";

export function LuckyNumber() {
  const [luckyNumber, setLuckyNumber] = useState(null);       
  const [history, setHistory] = useState([]);                 
  const [warning, setWarning] = useState("");                 

  function handleClick() {
    const drawn = Math.floor(Math.random() * 40) + 1;         

    if (history.includes(drawn)) {
      setWarning("Já foi sorteado!");
      setLuckyNumber(drawn);          
      return;
    }

    setHistory([...history, drawn]);
    setLuckyNumber(drawn);
    setWarning("");
  }

  return (
    <div className={styles.container}>
      {luckyNumber === null ? (
        <h1>Lucky Number 🎲</h1>
      ) : (
        <h1>Lucky Number = {luckyNumber}</h1>
      )}

      <button className={styles.button} onClick={handleClick}>
        I'm feeling lucky today!
      </button>

      {warning && <p className={styles.warning}>{warning}</p>}

      {history.length > 0 && (
        <>
          <h2 className={styles.subtitle}>Números sorteados:</h2>
          <ul className={styles.list}>
            {history.map((num) => (
              <li key={num}>{num}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}