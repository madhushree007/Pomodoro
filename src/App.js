import React from "react";
import "./styles.css";

function padTime(time) {
  return time.toString().padStart(2, "0");
}

export default function App() {
  const [timeLeft, setTimeLeft] = React.useState(25 * 60);
  const intervalRef = React.useRef(null);
  const startTimer = () => {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft >= 1) return timeLeft - 1;
        resetTimer();
        return 0;
      });
    }, 1000);
  };
  const stopTimer = () => {
    if (intervalRef.current == null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeLeft(25 * 60);
  };
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(Math.floor(timeLeft - minutes * 60));

  return (
    <div className="App">
      <h1>Pomodoro</h1>
      <div class="big">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
