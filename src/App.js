import * as React from "react";
import circle_icon from "../src/components/assets/circle.png";
import cross_icon from "../src/components/assets/cross.png";

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [nextValue, setNextValue] = React.useState("X");
  const [winner, setWinner] = React.useState(null);

  function selectSquare(square) {
    if (squares[square] || winner) {
      return;
    }

    const newSquares = [...squares];
    newSquares[square] = nextValue;
    setSquares(newSquares);

    const newWinner = calculateWinner(newSquares);
    setWinner(newWinner);

    const newNextValue = calculateNextValue(newSquares);
    setNextValue(newNextValue);
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue("X");
    setWinner(null);
  }

  function renderSquare(i) {
    const symbol = squares[i];
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {symbol === "X" ? (
          <div className="icon-container">
            <img src={cross_icon} alt={symbol} />
          </div>
        ) : symbol === "O" ? (
          <div className="icon-container">
            <img src={circle_icon} alt={symbol} />
          </div>
        ) : (
          symbol
        )}
      </button>
    );
  }

  return (
    <div className="board">
      <div className="status">
        {calculateStatus(winner, squares, nextValue)}
      </div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart-button" onClick={restart}>
        Restart
      </button>
    </div>
  );
}

function Game() {
  return (
    <div className="game-container">
      <div>
        <Board />
      </div>
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `It's a Draw!`
    : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
