import styles from "./page.module.css";

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighboringMines: number;
};

const initBoard = (rows: number, cols: number, mines: number): Cell[][] => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighboringMines: 0,
    }))
  );
}

export default function Home() {
  return (
    <div className={styles.main}>
      <h1>Minesweeper</h1>
    </div>
  );
}