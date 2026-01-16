import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Trophy, Gamepad2 } from "lucide-react";

type SquareValue = "X" | "O" | null;

function Square({ value, onClick, isWinning }: { value: SquareValue; onClick: () => void; isWinning: boolean }) {
  return (
    <button
      data-testid={`square-${value || 'empty'}`}
      className={`h-20 w-20 md:h-24 md:w-24 text-4xl md:text-5xl font-bold border-2 rounded-lg transition-all duration-200 hover-elevate active-elevate-2 ${
        isWinning 
          ? "bg-primary/20 border-primary text-primary" 
          : "bg-card border-border hover:border-primary/50"
      } ${value === "X" ? "text-blue-500" : value === "O" ? "text-red-500" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function calculateWinner(squares: SquareValue[]): { winner: SquareValue; line: number[] } | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default function Game() {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line || [];
  const isDraw = !winner && squares.every((square) => square !== null);

  const handleClick = (i: number) => {
    if (squares[i] || winner) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const newResult = calculateWinner(newSquares);
    if (newResult?.winner) {
      setScores((prev) => ({
        ...prev,
        [newResult.winner as "X" | "O"]: prev[newResult.winner as "X" | "O"] + 1,
      }));
    } else if (newSquares.every((s) => s !== null)) {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const resetAll = () => {
    resetGame();
    setScores({ X: 0, O: 0, draws: 0 });
  };

  let status;
  if (winner) {
    status = (
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-yellow-500" />
        <span className={winner === "X" ? "text-blue-500" : "text-red-500"}>
          Player {winner} Wins!
        </span>
      </div>
    );
  } else if (isDraw) {
    status = <span className="text-muted-foreground">It's a Draw!</span>;
  } else {
    status = (
      <span>
        Next Player:{" "}
        <span className={xIsNext ? "text-blue-500" : "text-red-500"}>
          {xIsNext ? "X" : "O"}
        </span>
      </span>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Gamepad2 className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Tic Tac Toe</h1>
          </div>
          <p className="text-muted-foreground">Mini Project - FGCT6021</p>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between gap-2">
              Scoreboard
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetAll}
                data-testid="button-reset-scores"
              >
                Reset Scores
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-6">
              <div className="text-center">
                <Badge variant="secondary" className="mb-1 bg-blue-500/10 text-blue-500">
                  Player X
                </Badge>
                <p className="text-2xl font-bold text-blue-500">{scores.X}</p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="mb-1">
                  Draws
                </Badge>
                <p className="text-2xl font-bold text-muted-foreground">{scores.draws}</p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="mb-1 bg-red-500/10 text-red-500">
                  Player O
                </Badge>
                <p className="text-2xl font-bold text-red-500">{scores.O}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold">{status}</h2>
            </div>

            <div className="flex justify-center mb-6">
              <div className="grid grid-cols-3 gap-2">
                {squares.map((square, i) => (
                  <Square
                    key={i}
                    value={square}
                    onClick={() => handleClick(i)}
                    isWinning={winningLine.includes(i)}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                onClick={resetGame} 
                variant="outline" 
                className="gap-2"
                data-testid="button-new-game"
              >
                <RotateCcw className="h-4 w-4" />
                New Game
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">How to Play</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Players take turns placing X or O on the board</li>
              <li>First player to get 3 in a row wins</li>
              <li>If all squares are filled with no winner, it's a draw</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
