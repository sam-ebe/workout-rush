import React, { useEffect, useState } from "react";

function SessionTimer({ endedSession }) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    console.log("timer");
    const intervalId = setInterval(() => {
      setElapsedTime((e) => e + 1);
    }, 1000);

    if (endedSession === true) {
      return clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [endedSession]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const timer = formatTime(elapsedTime);

  return <div>{timer}</div>;
}

export default SessionTimer;
