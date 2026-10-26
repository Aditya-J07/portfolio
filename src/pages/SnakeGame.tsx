import { useState, useEffect, useRef } from 'react';
import { RefreshCw, ArrowLeft, Play, Trophy, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 140;

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('snakeHighScore') || '0', 10);
    } catch {
      return 0;
    }
  });
  const gameLoopRef = useRef<number | null>(null);

  // Initialize game (Cleanup)
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver || !isPlaying) return;

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameOver, isPlaying]);

  // Game Loop
  useEffect(() => {
    if (gameOver || !isPlaying) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };

        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Check collision with walls
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          handleGameOver();
          return prevSnake;
        }

        // Check collision with self
        if (prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          handleGameOver();
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check Food Collision
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => {
            const newScore = s + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              try {
                localStorage.setItem('snakeHighScore', newScore.toString());
              } catch {
                // ignore
              }
            }
            return newScore;
          });
          generateFood(newSnake);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    gameLoopRef.current = window.setInterval(moveSnake, INITIAL_SPEED);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [direction, food, gameOver, highScore, isPlaying]);

  // Draw Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background pattern grid
    ctx.fillStyle = '#0F131D';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle grid lines
    ctx.strokeStyle = '#1B2232';
    ctx.lineWidth = 1;
    for (let x = 0; x <= GRID_SIZE * CELL_SIZE; x += CELL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
    }
    for (let y = 0; y <= GRID_SIZE * CELL_SIZE; y += CELL_SIZE) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, y);
      ctx.stroke();
    }

    // Draw Food (Pixel Redstone Apple)
    ctx.fillStyle = '#FF5A5F';
    ctx.fillRect(food.x * CELL_SIZE + 2, food.y * CELL_SIZE + 2, CELL_SIZE - 4, CELL_SIZE - 4);
    // Food highlight
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(food.x * CELL_SIZE + 4, food.y * CELL_SIZE + 4, 3, 3);

    // Draw Snake
    snake.forEach((segment, index) => {
      if (index === 0) {
        // Snake Head: Gold Block
        ctx.fillStyle = '#FFC83D';
        ctx.fillRect(
          segment.x * CELL_SIZE + 1,
          segment.y * CELL_SIZE + 1,
          CELL_SIZE - 2,
          CELL_SIZE - 2
        );
        // Eyes
        ctx.fillStyle = '#0E1016';
        ctx.fillRect(segment.x * CELL_SIZE + 4, segment.y * CELL_SIZE + 4, 3, 3);
        ctx.fillRect(segment.x * CELL_SIZE + 12, segment.y * CELL_SIZE + 4, 3, 3);
      } else {
        // Snake Body: Emerald Lichen
        ctx.fillStyle = index % 2 === 0 ? '#3DDC84' : '#2FB66B';
        ctx.fillRect(
          segment.x * CELL_SIZE + 1,
          segment.y * CELL_SIZE + 1,
          CELL_SIZE - 2,
          CELL_SIZE - 2
        );
      }
    });
  }, [snake, food]);

  const generateFood = (currentSnake: Point[]) => {
    let newFood: Point;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some((s) => s.x === newFood.x && s.y === newFood.y));
    setFood(newFood);
  };

  const handleGameOver = () => {
    setGameOver(true);
    setIsPlaying(false);
    stopGame();
  };

  const stopGame = () => {
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
  };

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setScore(0);
    setDirection('RIGHT');
    setGameOver(false);
    setIsPlaying(true);
    generateFood([{ x: 10, y: 10 }]);
  };

  return (
    <div className="min-h-screen pt-20 px-4 pb-16 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl space-y-6">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3 py-2 bg-surface-1 text-ink border-3 border-border font-pixel text-[10px] uppercase hover:bg-accent-yellow hover:text-accent-ink transition-all shadow-brutal-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        {/* Arcade Cabinet Frame */}
        <div className="bg-surface-1 border-6 border-border p-6 sm:p-8 shadow-brutal">
          {/* Cabinet Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-4 border-border mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-accent-red border-2 border-border inline-block animate-pulse" />
              <h1 className="font-heading text-xl sm:text-2xl text-ink uppercase">
                RETRO ARCADE // SNAKE
              </h1>
            </div>
            <span className="font-pixel text-[9px] bg-surface-deep text-accent-yellow px-2 py-1 border-2 border-border">
              INSERT COIN
            </span>
          </div>

          {/* Score HUD Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-surface-deep text-text-on-deep border-3 border-border shadow-[2px_2px_0px_var(--shadow)]">
              <p className="font-pixel text-[9px] text-accent-green uppercase">CURRENT SCORE</p>
              <p className="font-heading text-2xl sm:text-3xl text-accent-yellow mt-1">{score}</p>
            </div>
            <div className="p-3 bg-surface-deep text-text-on-deep border-3 border-border shadow-[2px_2px_0px_var(--shadow)] text-right">
              <p className="font-pixel text-[9px] text-accent-purple uppercase flex items-center justify-end gap-1">
                <Trophy size={12} />
                <span>HIGH SCORE</span>
              </p>
              <p className="font-heading text-2xl sm:text-3xl text-white mt-1">{highScore}</p>
            </div>
          </div>

          {/* Canvas Cabinet Screen */}
          <div className="relative bg-black border-4 border-border overflow-hidden shadow-inner aspect-square max-w-[400px] mx-auto">
            <canvas
              ref={canvasRef}
              width={GRID_SIZE * CELL_SIZE}
              height={GRID_SIZE * CELL_SIZE}
              className="block w-full h-full"
            />

            {/* Play Button Overlay */}
            {!isPlaying && !gameOver && (
              <div className="absolute inset-0 bg-surface-deep/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                <Sparkles className="w-10 h-10 text-accent-yellow mb-3 animate-bounce" />
                <h2 className="font-heading text-2xl text-white mb-2 uppercase">Ready, Player 1?</h2>
                <p className="font-pixel text-[9px] text-accent-yellow mb-6 max-w-xs">
                  Collect redstone orbs, avoid collisions with walls and body!
                </p>
                <button
                  type="button"
                  onClick={startGame}
                  className="px-8 py-3.5 min-h-[48px] bg-accent-yellow text-accent-ink font-pixel text-xs uppercase font-bold border-4 border-border flex items-center gap-2 hover:bg-accent-green transition-all shadow-[4px_4px_0px_#000] cursor-pointer"
                >
                  <Play size={18} />
                  <span>Start Game</span>
                </button>
              </div>
            )}

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-surface-deep/90 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                <div className="px-3 py-1 bg-accent-red text-white font-pixel text-[10px] mb-2 border border-white">
                  SIGNAL LOST
                </div>
                <h2 className="font-heading text-3xl text-accent-red mb-2 uppercase">GAME OVER</h2>
                <p className="font-pixel text-[10px] text-white mb-6">
                  FINAL SCORE: <span className="text-accent-yellow font-bold">{score}</span>
                </p>
                <button
                  type="button"
                  onClick={startGame}
                  className="px-6 py-3 min-h-[48px] bg-accent-yellow text-accent-ink font-pixel text-xs uppercase font-bold border-4 border-border flex items-center gap-2 hover:bg-accent-green transition-all shadow-[4px_4px_0px_#000] cursor-pointer"
                >
                  <RefreshCw size={16} />
                  <span>Play Again</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile D-Pad Controls */}
          <div className="mt-6 flex flex-col items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => direction !== 'DOWN' && setDirection('UP')}
              className="w-14 h-12 bg-surface-deep text-accent-yellow border-3 border-border font-pixel text-sm flex items-center justify-center active:bg-accent-yellow active:text-accent-ink shadow-[2px_2px_0px_#000]"
              aria-label="Up"
            >
              ▲
            </button>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => direction !== 'RIGHT' && setDirection('LEFT')}
                className="w-14 h-12 bg-surface-deep text-accent-yellow border-3 border-border font-pixel text-sm flex items-center justify-center active:bg-accent-yellow active:text-accent-ink shadow-[2px_2px_0px_#000]"
                aria-label="Left"
              >
                ◀
              </button>
              <button
                type="button"
                onClick={() => direction !== 'UP' && setDirection('DOWN')}
                className="w-14 h-12 bg-surface-deep text-accent-yellow border-3 border-border font-pixel text-sm flex items-center justify-center active:bg-accent-yellow active:text-accent-ink shadow-[2px_2px_0px_#000]"
                aria-label="Down"
              >
                ▼
              </button>
              <button
                type="button"
                onClick={() => direction !== 'LEFT' && setDirection('RIGHT')}
                className="w-14 h-12 bg-surface-deep text-accent-yellow border-3 border-border font-pixel text-sm flex items-center justify-center active:bg-accent-yellow active:text-accent-ink shadow-[2px_2px_0px_#000]"
                aria-label="Right"
              >
                ▶
              </button>
            </div>
          </div>

          {/* Desktop Controls Hint */}
          <div className="mt-6 pt-4 border-t-3 border-border/30 text-center font-pixel text-[9px] text-ink/75 uppercase hidden sm:block">
            USE ARROW KEYS OR [W, A, S, D] TO MANEUVER
          </div>
        </div>
      </div>
    </div>
  );
}
