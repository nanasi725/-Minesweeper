import styles from "./page.module.css";

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighboringMines: number;
};

const initBoard = (rows: number, cols: number, mines: number): Cell[][] => {
  const board = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighboringMines: 0,
    }))
  );
  placeMines(board, mines);
  return board;
}

const placeMines = (board: Cell[][], mines: number): void => {
  const rows = board.length;
  const cols = board[0].length;
  let placedMines = 0;

  while (placedMines < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      placedMines++;
    }
  }
} 

export default function Home() {
  return (
    <div className={styles.main}>
      <h1>Minesweeper</h1>
    </div>
  );
}