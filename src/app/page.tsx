"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighboringMines: number;
};

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

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
  calculateNeighboringMines(board);
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

const calculateNeighboringMines = (board: Cell[][]): void => {
  const rows = board.length;
  const cols = board[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;

      let count = 0; 
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
          count++;
        }
      }
      board[r][c].neighboringMines = count;
    }
  }
}

export default function Home() {
  const [board, setBoard] = useState<Cell[][]>(() => initBoard(10, 10, 10));

  const openCell = (r: number, c: number) => {
    if (board[r][c].isRevealed || board[r][c].isFlagged) return;
    const newBoard = board.map((row) => [...row]);
    newBoard[r][c] = { ...newBoard[r][c], isRevealed: true };
    setBoard(newBoard);
  };

   return (
    <div className={styles.main}>
      <h1>Minesweeper</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 30px)" }}>
        {board.map((row, rIndex) =>
          row.map((cell, cIndex) => (
            <div
              key={`${rIndex}-${cIndex}`}
              onClick={() => openCell(rIndex, cIndex)} 
              style={{
                width: 30,
                height: 30,
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // 開いていない(false)ならグレー、開いてる(true)なら爆弾か背景色
                backgroundColor: !cell.isRevealed
                  ? "#999" // 隠れている色
                  : cell.isMine
                  ? "#ffcccc" // 爆弾の色
                  : "#eee", // 開いた安全なマスの色
                color: "black",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {/* 開いている時だけ、中身を表示する */}
              {cell.isRevealed && (
                cell.isMine ? "💣" : cell.neighboringMines > 0 ? cell.neighboringMines : ""
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}