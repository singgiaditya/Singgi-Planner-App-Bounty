import React, { useState, useEffect } from 'react';

export default function StopwatchWidget() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Mengupdate waktu setiap 10 milidetik
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  return (
    <div className="stopwatch-widget">
      <h3>Stopwatch Widget</h3>
      <div className="time">{formatTime(time)}</div>
      <div className="controls">
        {isRunning ? (
          <button onClick={handleStop}>Stop</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
        {isRunning && <button onClick={handleLap}>Lap</button>}
        <button onClick={handleReset}>Reset</button>
      </div>
      {laps.length > 0 && (
        <div className="lap-list">
          <h4>Laps:</h4>
          <ul>
            {laps.map((lap, index) => (
              <li key={index}>{formatTime(lap)}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Helper function to format time in mm:ss.SSS format
function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds)}`;
}

// Helper function to pad single digit numbers with leading zero
function padZero(number) {
  return number.toString().padStart(2, '0');
}
