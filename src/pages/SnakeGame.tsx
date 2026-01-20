import { useState, useEffect, useRef } from 'react';
import { RefreshCw, ArrowLeft, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

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
    const [highScore, setHighScore] = useState(() => parseInt(localStorage.getItem('snakeHighScore') || '0'));
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

            // Prevent scroll for arrow keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            }

            switch (e.key) {
                case 'ArrowUp':
                    if (direction !== 'DOWN') setDirection('UP');
                    break;
                case 'ArrowDown':
                    if (direction !== 'UP') setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    if (direction !== 'RIGHT') setDirection('LEFT');
                    break;
                case 'ArrowRight':
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
                    case 'UP': head.y -= 1; break;
                    case 'DOWN': head.y += 1; break;
                    case 'LEFT': head.x -= 1; break;
                    case 'RIGHT': head.x += 1; break;
                }

                // Check collision with walls
                if (
                    head.x < 0 ||
                    head.x >= GRID_SIZE ||
                    head.y < 0 ||
                    head.y >= GRID_SIZE
                ) {
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
                            localStorage.setItem('snakeHighScore', newScore.toString());
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

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw Food
        ctx.fillStyle = 'var(--color-red)';
        ctx.beginPath();
        ctx.arc(
            food.x * CELL_SIZE + CELL_SIZE / 2,
            food.y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 2 - 2,
            0,
            2 * Math.PI
        );
        ctx.fill();

        // Draw Snake
        snake.forEach((segment, index) => {
            ctx.fillStyle = index === 0 ? 'var(--color-accent)' : 'var(--color-text)';
            ctx.fillRect(
                segment.x * CELL_SIZE + 1,
                segment.y * CELL_SIZE + 1,
                CELL_SIZE - 2,
                CELL_SIZE - 2
            );
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
        setIsPlaying(false); // Stop playing on game over
        stopGame();
    };

    const stopGame = () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };

    const startGame = () => { // Renamed resetGame to startGame and updated logic
        setSnake([{ x: 10, y: 10 }]);
        setScore(0);
        setDirection('RIGHT');
        setGameOver(false);
        setIsPlaying(true); // Set playing to true
        generateFood([{ x: 10, y: 10 }]);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Link to="/" className="inline-flex items-center gap-2 text-subtext0 hover:text-accent mb-6 transition-colors">
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </Link>

                <div className="bg-surface0 p-6 rounded-2xl border border-surface1 shadow-xl">
                    <div className="flex justify-between items-center mb-6 font-mono">
                        <div>
                            <p className="text-subtext0 text-sm">SCORE</p>
                            <p className="text-2xl font-bold text-accent">{score}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-subtext0 text-sm">HIGH SCORE</p>
                            <p className="text-2xl font-bold text-text">{highScore}</p>
                        </div>
                    </div>

                    <div className="relative bg-base rounded-lg overflow-hidden border border-surface2 aspect-square"> {/* Added aspect-square */}
                        <canvas
                            ref={canvasRef}
                            width={GRID_SIZE * CELL_SIZE}
                            height={GRID_SIZE * CELL_SIZE}
                            className="block w-full h-full" // Added w-full h-full
                        />

                        {!isPlaying && !gameOver && ( // Play button overlay
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <button
                                    onClick={startGame}
                                    className="flex items-center gap-2 px-8 py-3 bg-accent text-base font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
                                >
                                    <Play size={24} />
                                    Start Game
                                </button>
                            </div>
                        )}

                        {gameOver && (
                            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                                <p className="text-red font-bold text-2xl mb-4">GAME OVER</p>
                                <button
                                    onClick={startGame} // Changed to startGame
                                    className="flex items-center gap-2 px-6 py-2 bg-accent text-base font-bold rounded-full hover:bg-opacity-90 transition-all"
                                >
                                    <RefreshCw size={20} />
                                    Play Again
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 text-center text-subtext0 text-sm font-mono">
                        Use Arrow Keys to Move
                    </div>
                </div>
            </div>
        </div>
    );
}
