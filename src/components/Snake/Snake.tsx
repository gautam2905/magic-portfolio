"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Snake.module.scss";

const COLS = 20;
const ROWS = 20;
const TICK_MS = 150;
const HIGH_SCORE_KEY = "gautam-os.snake.highscore";

type Vec = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";

const DIR_VECS: Record<Dir, Vec> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

function randCell(occupied: Vec[]): Vec {
  while (true) {
    const c = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    if (!occupied.some((s) => s.x === c.x && s.y === c.y)) return c;
  }
}

export default function Snake({ onExit }: { onExit: (score: number) => void }) {
  const [snake, setSnake] = useState<Vec[]>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const [food, setFood] = useState<Vec>({ x: 14, y: 10 });
  const [dir, setDir] = useState<Dir>("right");
  const dirRef = useRef<Dir>("right");
  const queuedDirRef = useRef<Dir | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [dead, setDead] = useState(false);
  const tickRef = useRef<number | null>(null);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || "0", 10);
    setHighScore(isNaN(stored) ? 0 : stored);
  }, []);

  const exit = useCallback(() => {
    if (score > highScore) {
      localStorage.setItem(HIGH_SCORE_KEY, String(score));
    }
    onExit(score);
  }, [score, highScore, onExit]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const k = e.key.toLowerCase();
      if (k === "q" || k === "escape") {
        e.preventDefault();
        exit();
        return;
      }
      const map: Record<string, Dir> = {
        arrowup: "up",
        arrowdown: "down",
        arrowleft: "left",
        arrowright: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right",
      };
      const next = map[k];
      if (!next) return;
      e.preventDefault();
      const cur = dirRef.current;
      if (
        (cur === "up" && next === "down") ||
        (cur === "down" && next === "up") ||
        (cur === "left" && next === "right") ||
        (cur === "right" && next === "left")
      ) {
        return;
      }
      queuedDirRef.current = next;
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [exit]);

  useEffect(() => {
    if (dead) return;
    function tick() {
      setSnake((prevSnake) => {
        const queued = queuedDirRef.current;
        const useDir = queued ?? dirRef.current;
        if (queued) {
          dirRef.current = queued;
          setDir(queued);
          queuedDirRef.current = null;
        }
        const head = prevSnake[0];
        const v = DIR_VECS[useDir];
        const newHead = { x: head.x + v.x, y: head.y + v.y };

        // walls
        if (
          newHead.x < 0 ||
          newHead.x >= COLS ||
          newHead.y < 0 ||
          newHead.y >= ROWS
        ) {
          setDead(true);
          return prevSnake;
        }
        // self
        if (prevSnake.some((s) => s.x === newHead.x && s.y === newHead.y)) {
          setDead(true);
          return prevSnake;
        }

        const grew = newHead.x === food.x && newHead.y === food.y;
        const newSnake = grew
          ? [newHead, ...prevSnake]
          : [newHead, ...prevSnake.slice(0, -1)];
        if (grew) {
          setScore((s) => s + 1);
          setFood(randCell(newSnake));
        }
        return newSnake;
      });
    }
    tickRef.current = window.setInterval(tick, TICK_MS);
    return () => {
      if (tickRef.current !== null) window.clearInterval(tickRef.current);
    };
  }, [dead, food]);

  // build grid
  const grid: string[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => " "),
  );
  snake.forEach((s, i) => {
    if (s.y >= 0 && s.y < ROWS && s.x >= 0 && s.x < COLS) {
      grid[s.y][s.x] = i === 0 ? "@" : "#";
    }
  });
  if (food.y >= 0 && food.y < ROWS && food.x >= 0 && food.x < COLS) {
    grid[food.y][food.x] = "*";
  }

  const top = "╔" + "═".repeat(COLS * 2) + "╗";
  const bot = "╚" + "═".repeat(COLS * 2) + "╝";
  const rows = grid.map((row) => "║" + row.map((c) => c + " ").join("") + "║");
  const board = [top, ...rows, bot].join("\n");

  return (
    <div className={styles.wrap}>
      <div className={styles.hud}>
        <span>SNAKE</span>
        <span>score: {score}</span>
        <span>high: {Math.max(score, highScore)}</span>
        <span className={styles.help}>WASD/arrows · q/ESC to quit</span>
      </div>
      <pre className={`${styles.board} ${dead ? styles.dead : ""}`}>{board}</pre>
      {dead && (
        <div className={styles.gameOver}>
          GAME OVER — score {score}. press q or ESC to return.
        </div>
      )}
    </div>
  );
}
