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
  }
}